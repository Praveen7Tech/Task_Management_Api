import { IOtpService } from "../../domain/services/otp.service";

export class OtpService implements IOtpService {
    async generate(): Promise<string> {
        const otp = Math.floor(10000 + Math.random() * 90000).toString();
        return otp
    }
}