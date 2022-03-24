import {LoginElements} from './../../elements/store/login-elements';

export const StoreLoginPage = {
    doLoginIfNecessary() {
        cy.location('pathname').then(url => {
            if (url.includes('wp-login.php')) {
                cy.wait(1500);
                cy.get(LoginElements.usernameInput).type('admin');
                cy.get(LoginElements.passwordInput).type('admin');
                cy.get(LoginElements.accessButton).click();
                cy.get('body').then(body => {
                    if (body.find(LoginElements.confirmEmailButton).length > 0) {
                        cy.get(LoginElements.confirmEmailButton).click();
                    };
                  });
            };
        });
    },
}
