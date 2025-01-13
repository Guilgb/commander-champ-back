export class PlatformValidator {
    static validatePlatform(platform) {
        if (platform === 'topdeckgg') {
            return true;
        }
        return false;
    }
}