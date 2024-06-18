
// function printOnScreenResult(result) {
//     const resultElement = document.createElement('p');
//     resultElement.textContent = result;
//     document.getElementById('form-container').appendChild(resultElement);
// }

// function calculateSalePotential (
//     annualBilling,
//     storeSegment,
//     numOfStores,
//     storeSize,
//     averageTicket,
//     hasRegionalBrand,
//     numOfOnlineAccess) {

//      // Loja //
 
//      const storeSegmentsValues = {
//          "PP": 1,
//          "P": 3,
//          "M": 5,
//          "G": 10,
//          "GG": 15,
//      }

//      const storeSizeValue = storeSegmentsValues[storeSize]
    
//      const lojaResultMonthly = numOfStores * storeSizeValue * averageTicket
//      const lojaResultYearly = lojaResultMonthly*14

//      console.log("Canal de venda: Loja")
//      console.log("Mensal")
//      console.log(lojaResultMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
//      console.log("Anual")
//      console.log(lojaResultYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
//      console.log("---------------------------------")

//      printOnScreenResult(lojaResultMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
//     printOnScreenResult(lojaResultYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
     
 
 
//      // Corporativo //

//      let corporativoResultMonthly = 0
 
//      if (hasRegionalBrand) {
//          corporativoResultMonthly = annualBilling / 5000 * 0.10
//      } else {
//          corporativoResultMonthly = annualBilling / 5000
//      }
 
//      const corporativoResultYearly = corporativoResultMonthly*14
 
//      console.log("Canal de venda: Corporativo")
//      console.log("Mensal")
//      console.log(corporativoResultMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
//      console.log("Anual")
//      console.log(corporativoResultYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
//      console.log("---------------------------------")
     
//      printOnScreenResult(corporativoResultMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
//         printOnScreenResult(corporativoResultYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
 
 
//      // E-commerce //
 
//      let ecommerceResultMonthly = 0
 
//      if(storeSegment === "Restaurante") {
//          ecommerceResultMonthly = numOfOnlineAccess / 1000 * averageTicket
//      } else {
//          ecommerceResultMonthly = numOfOnlineAccess / 1000 * 0.08 * averageTicket
//      }
//      const ecommerceResultYearly = ecommerceResultMonthly*14
 
//      console.log("Canal de venda: E-commerce")
//      console.log("Mensal")
//      console.log(ecommerceResultMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
//      console.log("Anual")
//      console.log(ecommerceResultYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
//      console.log("---------------------------------")
 

//         printOnScreenResult(ecommerceResultMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
//         printOnScreenResult(ecommerceResultYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
//      // Total
 
//      const totalMonthly = lojaResultMonthly + corporativoResultMonthly + ecommerceResultMonthly
//      const totalYearly = lojaResultYearly + corporativoResultYearly + ecommerceResultYearly
 
//      console.log("---- Total ----")
//      console.log("Mensal")
//      console.log(totalMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
//      console.log("Anual")
//      console.log(totalYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
//      console.log("---------------------------------")
 
//      printOnScreenResult(totalMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
//     printOnScreenResult(totalYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
     

// }

// // calculateSalePotential(1000000000, "Moda", 120, "M", 350, false, 1200000)
   