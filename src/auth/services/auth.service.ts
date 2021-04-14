import { IUser } from '~/user/interfaces/user.interface';
import { VALIDATION_CODE_CONFIG, TOKEN_OPTIONS } from '~/auth/auth.conf';
import { UserService } from '~/user/services/user.service';
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import {
  TWILIO_AUTH_TOKEN,
  TWILIO_ACCOUNT_SID,
  TWILIO_PHONE_NUMBER, SIB_V3_API_KEY,
} from '~/commons/config/env';
import { Twilio } from 'twilio';
import { TokenService } from '~/auth/services/token.service';
import { LoginInput } from '~/auth/dto/login.input';
import { Session } from '~/auth/dto/session.entity';
import { User } from '~/user/dto/user.entity';
import { RegisterInput } from '../dto/register.input';
import { generate } from 'generate-password';
import { getRndInteger } from '~/commons/utils';
import { UserState } from '~/user/enums/user-state.enum';
import { LoginAdminDto } from '../dto/login-admin.dto';
import { genSalt, hash, compare } from 'bcrypt';
const SibApiV3Sdk = require('sib-api-v3-sdk');

@Injectable()
export class AuthService {
  client: Twilio;
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {
    this.client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  }


  async signup(user: RegisterInput): Promise<Session> {
    const found = await this.userService.findOne({ email: user.email });
    if (found) {
      throw new ForbiddenException("Email déjà utilisé");
    }
    const salt = await genSalt();
    user.password = await hash(user.password, salt);
    const createdUser: User = await this.userService.insertOne({ ...user, salt });
    const connectionToken: string = this.tokenService.sign(
      { sub: createdUser._id },
      TOKEN_OPTIONS.connectionTokenOption,
    );
    const session: Session = { token: connectionToken, user: createdUser };
    return session;
  }

  async signin(credentials: LoginInput): Promise<Session> {
    const user = await this.userService.findOneOrFail({ email: credentials.email });
    const isMatch = await compare(credentials.password, user && user.password);
    if (!isMatch) {
      throw new NotFoundException("Email ou mot de passe incorrecte");
    }
    const connectionToken: string = this.tokenService.sign(
      { sub: user._id },
      TOKEN_OPTIONS.connectionTokenOption,
    );
    user.password = null;
    const session: Session = { token: connectionToken, user: user };
    return session;
  }

  async sendResetPasswordEmail(email: string): Promise<string> {
    const defaultClient = SibApiV3Sdk.ApiClient.instance
    const apiKey = defaultClient.authentications['api-key']
    const apiInstance = new SibApiV3Sdk.SMTPApi()
    apiKey.apiKey = SIB_V3_API_KEY;
    const code = getRndInteger(1000, 9999);
    const resetToken: string = this.tokenService.sign(
      { sub: { email, code } },
      TOKEN_OPTIONS.connectionTokenOption,
    );
    let sendSmtpEmail = {
      to: [{ email }],
      templateId: 1,
      params: {
        code,
      }
    }
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      console.log('API called successfully. Returned data: ' + data);
    }, function(error) {
      console.error(error);
    });
    return resetToken;
  }
  
}
