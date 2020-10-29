import { CredentialsService } from 'projects/calden-lib/src/lib/auth';

export function appInitializer(credentialsSvc: CredentialsService): any {
    return () => {
      if (credentialsSvc.credentials) {
        credentialsSvc.startRefreshTokenTimer();
      }
    };
}
