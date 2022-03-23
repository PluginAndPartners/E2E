import {StoreLoginElements} from '../../elements/store/login-elements';

export const StoreLoginPage = {
    doLoginIfNecessary() {
        cy.location('pathname').then(url => {
            if (url.includes('wp-login.php')) {
                cy.wait(1500);
                cy.get(StoreLoginElements.usernameInput).type('admin');
                cy.get(StoreLoginElements.passwordInput).type('admin');
                cy.get(StoreLoginElements.accessButton).click();
                cy.get('body').then(body => {
                    if (body.find(StoreLoginElements.confirmEmailButton).length > 0) {
                        cy.get(StoreLoginElements.confirmEmailButton).click();
                    };
                  });
            };
        });
    },
}
