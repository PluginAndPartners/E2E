export const IframePage = {
  getIframeElementName(iFrameName, elementName) {
   return getIframeBody(iFrameName).find(elementName, {log: true});
  },
};

const getIframeDocument = (iFrameName) => {
  return cy.get(iFrameName).its("0.contentDocument").should("exist");
};

const getIframeBody = (iFrameName) => {
  return getIframeDocument(iFrameName)
    .its("body")
    .should("not.be.undefined")
    .then(cy.wrap);
};
