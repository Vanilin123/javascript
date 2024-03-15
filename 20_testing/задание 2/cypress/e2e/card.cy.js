/// <reference types="cypress"/>
describe('Card',()=>{
  beforeEach(()=>{
      cy.visit('http://127.0.0.1:5500/src/index.html');
  });

  it('В начальном состоянии игра должна иметь поле четыре на четыре клетки, в каждой клетке цифра должна быть невидима', ()=>{
    cy.get('#game div.card')
  .should('have.length', 16)
  });

  it('Нажать на одну произвольную карточку. Убедиться, что она осталась открытой.', ()=>{
    cy.get('#game div')
  .should('have.length.gt', 7)
  .its('length')
  .then((n) => Cypress._.random(0, n - 1))
  .then((k) => {
    cy.log(`picked random index ${k}`)
    cy.get('#game div').eq(k).click()
    cy.get('div.card.open')
  })
  });

  it('Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, то повторять со следующей карточкой, пока не будет найдена пара. Проверить, что найденная пара карточек осталась видимой', ()=>{
   cy.get('.card').then(cards =>{
    const firstText = cards[0].textContent
    for(let i=1; i<cards.length;i++){
      cy.get('.card').first().click().find('h5').should('be.visible')
      cy.get('.card').eq(i).click().find('h5').should('be.visible')
      cy.wait(1000);
      if(firstText === cards[i].textContent){
        cy.get('.card').first().click().find('h5').should('be.visible')
      cy.get('.card').eq(i).click().find('h5').should('be.visible')
      break
      }
    }
   })
    });
    

  it('Нажать на левую верхнюю карточку, затем на следующую. Если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки. Проверить, что после нажатия на третью карточку две несовпадающие карточки становятся закрытыми.', ()=>{
    cy.get('.card').then(cards =>{
      for(let i=1; i<cards.length;i+2){
        let k=0;
        const firstText = cards[k].textContent
        cy.get('.card').eq(i).click().find('h5').should('be.visible')
        cy.get('.card').eq(k).click().find('h5').should('be.visible')
        cy.wait(1000);
        if(firstText != cards[i].textContent){
          break
        }else{
          k=+2
        }
      }
     })
  });

})
