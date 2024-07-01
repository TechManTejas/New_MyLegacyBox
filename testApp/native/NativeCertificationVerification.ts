import { NativeModules } from "react-native";
const { CertificateVerification } = NativeModules;

interface CertificateVerificationInterface {
  verifyAppSignatureCertificate(certificates: string[]): Promise<boolean>;
}

export default CertificateVerification as CertificateVerificationInterface;
