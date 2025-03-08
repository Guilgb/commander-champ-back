import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as yup from 'yup';

const userPayload = yup.object({
  sub: yup.string().required(),
});

export type UserPayload = yup.InferType<typeof userPayload>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Buffer.from(process.env.JWT_PUBLIC_KEY, 'base64').toString('utf8'),
      algorithms: ['RS256']
    });
  }

  async validate(payload: UserPayload) {
    return { sub: payload.sub };
  }
}