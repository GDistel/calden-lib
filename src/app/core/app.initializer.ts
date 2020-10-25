import { CredentialsService } from '../auth/credentials.service';

export function appInitializer(credentialsSvc: CredentialsService): any {
    return () => {
      if (credentialsSvc.credentials) {
        credentialsSvc.startRefreshTokenTimer();
      }
    };
}
