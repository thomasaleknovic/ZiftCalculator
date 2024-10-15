

document.addEventListener('DOMContentLoaded', function () {

    const mediaSize = window.matchMedia("(max-width: 600px)");

    // Função para calcular o potencial de venda
    function calculateSalePotential(annualBilling, storeSegment, numOfStores, storeSize, averageTicket, hasRegionalBrand, numOfOnlineAccess) {
        const storeSegmentsValues = {
            "PP": 1,
            "P": 3,
            "M": 5,
            "G": 10,
            "GG": 15,
        }

       
        const storeSizeValue = storeSegmentsValues[storeSize];
        const lojaResultMonthly = numOfStores * storeSizeValue * averageTicket;
        const lojaResultYearly = lojaResultMonthly * 14;

        console.log(hasRegionalBrand)
        let corporativoResultMonthly = hasRegionalBrand === "sim" ? (annualBilling / 5000 * 0.1) : (annualBilling / 5000);
        console.log(corporativoResultMonthly)

        const corporativoResultYearly = corporativoResultMonthly * 14;

        let ecommerceResultMonthly = storeSegment === "Restaurante"
            ? (numOfOnlineAccess / 1000 * averageTicket)
            : (numOfOnlineAccess / 1000 * 0.08 * averageTicket);
        const ecommerceResultYearly = ecommerceResultMonthly * 14;

        const totalMonthly = lojaResultMonthly + corporativoResultMonthly + ecommerceResultMonthly;
        const totalYearly = lojaResultYearly + corporativoResultYearly + ecommerceResultYearly;

        const finalLojaResultMonthly = lojaResultMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        const finalLojaResultYearly = lojaResultYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        const finalCorporativoResultMonthly = corporativoResultMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

        const finalCorporativoResultYearly = corporativoResultYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

        const finalEcommerceResultMonthly = ecommerceResultMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

        const finalEcommerceResultYearly = ecommerceResultYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

        const finaltotalMonthly = totalMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

        const finalTotalYearly = totalYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

        createResultModal(
            finalLojaResultMonthly,
            finalLojaResultYearly,
            finalEcommerceResultMonthly,
            finalEcommerceResultYearly,
            finalCorporativoResultMonthly,
            finalCorporativoResultYearly,
            finaltotalMonthly,
            finalTotalYearly
        );

    }

    // Função para obter o valor formatado de um campo de entrada
    function getFormattedValue(value) {
        
        
        // Remove o símbolo "R$"
    let numericString = value.replace("R$", "");
    
    // Remove espaços em branco (se houver)
    numericString = numericString.trim();
    
    // Substitui pontos por nada
    numericString = numericString.replace(/\./g, "");
    
    // Substitui a vírgula por ponto
    numericString = numericString.replace(",", ".");
    
    // Converte para float
    let floatNumber = parseFloat(numericString);
    
    return floatNumber;
    }

    function createResultModal(lojaResultMonthly, lojaResultYearly, ecommerceResultMonthly, ecommerceResultYearly, corporativoResultMonthly, corporativoResultYearly, totalMonthly, totalYearly) {
        const metaMedia = document.createElement('meta');
        metaMedia.setAttribute('name', 'viewport');
        metaMedia.setAttribute('content', 'width=device-width, initial-scale=1, minimum-scale=1');
        document.head.appendChild(metaMedia);

        if (mediaSize.matches){
        const style = document.createElement('style');
        style.textContent = `

        body{
        position: relative;
        
        }
        #modal-background {
        background-color: rgba(48, 48, 48, 0.3); 
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 9999;
        }
        
        #modal-container {
        background-color: #f2f2f2;
        width: 340px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 30px;
        border-radius: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        color: #b72776
        
        }
        
        #result-container {
        padding: 20px;
        width: 340px;
        display: flex;
        justify-items: center;
        }
        .result-table {
        width: 320px;
        }

        .result-table td {
        background: transparent !important;
        border: 0;  
        font-size: 12px;  
        }

        .Loja_container, .E-commerce_container, .Corporativo_container {
        border-bottom: 1px solid #b72776;
        }

        #Loja_1, #Loja_2,#E-commerce_1, #E-commerce_2, #Corporativo_1, #Corporativo_2 {
        font-weight: bold;
        }

        #table-header {
        
        font-size: 12px;
        }

        #result-title {
        font-size: 20px;
        }

        #result-paragraph {
        font-size: 14px;
        width: 300px;
        }

        .Total_container  {
        background: transparent !important;
        border: 0;
        color: #f2f2f2;
        border-radius: 50px;
        padding: 10px
        }

        .Total_container td {
        
        background: #b72776 !important;
        border: 0;
        }

        #Total_0 {
        border-radius: 50px 0px 0px 50px;
        }
        
        #Total_2 {
        border-radius: 0px 50px 50px 0px;
        }

        ._container{
        opacity: 0;
        border: 0;
        }

        ._container td {
        
        opacity: 0;
        border: 0;
        }

        #result-button {
        height: 40px !important;
        width: 250px !important;
        padding: 8px !important;
        border-radius: 50px !important;
        background-color: #303030 !important;
        color: white !important;
        border: none !important;
        cursor: pointer !important;
        margin: auto !important;
        margin-top: 30px !important;
        }

        #exit-button {
        border: none !important;
        position: absolute !important;
        top: 15px !important;
        right: 15px !important;
        color: #303030 !important;
        font-size: 20px !important;
        background-color: transparent !important;
        }

        #exit-button:hover{
        color: #f2f2f2 !important;
        background-color: #b72776 !important;
        }

        
        
        
        `
        document.head.appendChild(style);
        } else {
            const style = document.createElement('style');
            style.textContent = `
    
            body{
            position: relative;
            
            }
    
            #modal-background {
            background-color: rgba(48, 48, 48, 0.3); 
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 9999;
            }
            
            #modal-container {
            background-color: #f2f2f2;
            width: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 30px;
            border-radius: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            color: #b72776
            
            }
            
            #result-container {
            width: 500px;
            }
    
            .result-table td {
            background: transparent !important;
            border: 0;    
            }
    
            .Loja_container, .E-commerce_container, .Corporativo_container {
            border-bottom: 1px solid #b72776;
            }
    
            #Loja_1, #Loja_2,#E-commerce_1, #E-commerce_2, #Corporativo_1, #Corporativo_2 {
            font-weight: bold;
            }
    
            #table-header {
            
            font-size: 12px;
            }
    
            #result-title {
            font-size: 20px;
            }
    
            #result-paragraph {
            font-size: 14px;
            width: 300px;
            }
    
            .Total_container  {
            background: transparent !important;
            border: 0;
            color: #f2f2f2;
            border-radius: 50px;
            padding: 10px
            }
    
            .Total_container td {
            
            background: #b72776 !important;
            border: 0;
            }
    
            #Total_0 {
            border-radius: 50px 0px 0px 50px;
            }
            
            #Total_2 {
            border-radius: 0px 50px 50px 0px;
            }
    
            ._container{
            opacity: 0;
            border: 0;
            }
    
            ._container td {
            
            opacity: 0;
            border: 0;
            }
    
            #result-button {
            height: 40px !important;
            width: 250px !important;
            padding: 8px !important;
            border-radius: 50px !important;
            background-color: #303030 !important;
            color: white !important;
            border: none !important;
            cursor: pointer !important;
            margin: auto !important;
            margin-top: 30px !important;
            }
    
            #exit-button {
            border: none !important;
            position: absolute !important;
            top: 15px !important;
            right: 15px !important;
            color: #303030 !important;
            font-size: 20px !important;
            background-color: transparent !important;
            }
    
            #exit-button:hover{
            color: #f2f2f2 !important;
            background-color: #b72776 !important;
            }
    
            
            
            
            `
            document.head.appendChild(style);
        }
        // Criação do modal para o resultado
        const background = document.createElement('div');
        background.setAttribute('id', 'modal-background');

        const modal = document.createElement('div');
        modal.setAttribute('id', 'modal-container');

        const title = document.createElement('h1');
        title.innerText = "Quer saber mais detalhes da sua projeção?"
        title.setAttribute('id', 'result-title')

        const paragraph = document.createElement('p');
        paragraph.innerText = "Clique no botão abaixo e fala com nosso consultor para montar um Business plan."
        paragraph.setAttribute('id', 'result-paragraph')


        const button = document.createElement('a');
        button.innerHTML = 'Falar com Consultor';
        button.setAttribute('href', 'https://wa.me/5511992263192/?text=Olá!%20Já%20fiz%20minha%20simulação%20e%20quero%20montar%20o%20meu%20Business%20Plan');
        button.setAttribute('target', '_blank')
        button.setAttribute('id', 'result-button')

        const exitButton = document.createElement('button');
        exitButton.innerHTML = 'X';
        exitButton.setAttribute('id', 'exit-button')

        exitButton.addEventListener('click', () => {
            background.remove();
        })

        const table = createTable(lojaResultMonthly, lojaResultYearly, ecommerceResultMonthly, ecommerceResultYearly, corporativoResultMonthly, corporativoResultYearly, totalMonthly, totalYearly);

        document.body.appendChild(background);
        background.appendChild(modal);
        modal.appendChild(table);
        modal.appendChild(title);
        modal.appendChild(paragraph);
        modal.appendChild(button);
        modal.appendChild(exitButton);


    }

    function createTable(lojaResultMonthly, lojaResultYearly, ecommerceResultMonthly, ecommerceResultYearly, corporativoResultMonthly, corporativoResultYearly, totalMonthly, totalYearly) {

        // Obtém uma referência ao elemento <div> onde você deseja inserir a tabela
        const div = document.createElement("div");
        div.setAttribute('id', 'result-container');

        // Cria o elemento <table>
        const table = document.createElement("table");
        table.className = 'result-table'


        // Cria as células da tabela (4 linhas x 3 colunas)
        const headerRow = table.insertRow(); // Insere a linha do cabeçalho
        const headerCells = ["Canal de venda", "Mensal", "Anual"];
        headerRow.setAttribute('id', 'table-header');
        headerCells.forEach((text) => {
            const cell = headerRow.insertCell();
            cell.className = text;
            cell.appendChild(document.createTextNode(text));
        });

        // Dados das outras linhas
        const data = [
            ["Loja", lojaResultMonthly, lojaResultYearly],
            ["E-commerce", ecommerceResultMonthly, ecommerceResultYearly],
            ["Corporativo", corporativoResultMonthly, corporativoResultYearly],
            ["", "", ""],
            ["Total", totalMonthly, totalYearly],
        ];

        // Preenche as células com os dados
        data.forEach((rowData) => {
            const row = table.insertRow();
            row.className = `${rowData[0]}_container`;
            rowData.forEach((text, index) => {
                const cell = row.insertCell();
                cell.className = text;
                cell.setAttribute('id', rowData[0] + '_' + index)
                cell.appendChild(document.createTextNode(text));
            });
        });

        // Anexa a tabela à <div>
        div.appendChild(table);

        return div;

    }

  

    // Criação do contêiner principal
    const mainContainer = document.createElement('div');
    mainContainer.setAttribute('id', 'main-container');
    document.body.appendChild(mainContainer);

    // Criação do contêiner para o formulário
    const formContainer = document.createElement('div');
    formContainer.setAttribute('id', 'form-container');
    document.getElementById('main-container').appendChild(formContainer);

    // Função para criar o formulário
    function createForm() {

        const metaMedia = document.createElement('meta');
        metaMedia.setAttribute('name', 'viewport');
        metaMedia.setAttribute('content', 'width=device-width, initial-scale=1, minimum-scale=1');
        document.head.appendChild(metaMedia);

        
        if (mediaSize.matches){

            const styleMobile = document.createElement('style');
            styleMobile.textContent = `
           
              body {
                      
                      font-family: Arial, sans-serif;
                  }
                  #main-container {
                    background-color: #B72776;
                    border-radius: 32px;
                    width: 100%;
                    color: white;  
                    margin: auto;
                    margin-top: 20px;
                    margin-bottom: 20px;
                   
                  }

                  #form-container {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  padding: 30px;
                  padding-bottom: 0px;
                  
      
                  }
                  #calculatorForm {
                  display: flex;
                  justify-items: center;
                  align-items: start;
                  flex-direction: column;
                  gap: 20px;
                  row-gap: 10px;
                  width: -webkit-fill-available;
                
                 
      
      
                  }
                  
                  form {
                      display: flex;
                      flex-direction: column;
                      gap: 10px;
                  }
      
                  .result {
                      margin: 5px 0;
                  }
      
                  input {
                  font-size: 14px !important;
                  }
      
                  
      
                  input[type="text"], input[type="email"] {
                  margin-top: 10px !important; 
                  height: 40px !important; 
                  padding: 10px !important;
                  display: flex !important;  
                  border-radius: 6px !important;
                  outline: none !important;
                  border: none !important;
                  
                  }
      
                  #faturamento, #numOfStores, #numOfOnlineAccess {
                  margin-top: 10px !important; 
                  height: 40px !important; 
                  padding: 10px !important;
                  display: flex !important;  
                  border-radius: 6px !important;
                  outline: none !important;
                  border: none !important;
                  }
      
                  label {
                  font-size: 14px !important;
                  }
      
                  .numOfOnlineAccess label {
                  font-size: 14px !important;
                  width: 160px !important;
                  }
      
                  select {
                  height: 40px;
                  padding: 5px;
                  display: flex;  
                  border-radius: 6px;
                  outline: none;
                  border: none;
                  }
      
                  .submitFormButton {
                  height: 40px !important;
                  width: 100px !important; 
                  padding: 5px !important;
                  border-radius: 50px !important;
                  background-color: #303030 !important;
                  color: white !important;
                  border: none !important;
                  cursor: pointer !important;
                  margin: auto !important;
                  margin-top: 30px !important;
                  margin-bottom: 30px !important;
                  }
      
                  .storeSegment {
                  margin-bottom: 0px !important;
                  }
      
                  .name, .name input, .function, .function input, .email, .company, .email input, .company input, .numOfStores, .numOfStores input, .storeSegment, .storeSegment select  { 
                   width: -webkit-fill-available !important;
                  
                  }
      
                  .storeSegment select {
                   width: -webkit-fill-available !important;
                  margin-top: 10px !important;
                  }
      
                  .storeSegment {
                  position: relative;
                  }
      
                //   .storeSegment::after {
                //   content: '';
                //   display: block; 
                //   width: 280px; 
                //   height: 1px;
                //   background-color: white; 
                //   position: absolute; 
                //   bottom: -30px; 
                //   left: 0px; 
              
                //   }
      
                  .faturamento, .faturamento input {
                  width: -webkit-fill-available !important;
                  
                  }
      
                  .numOfOnlineAccess, .numOfOnlineAccess input {
                  width: -webkit-fill-available;
                  
                  }
      
                  .numOfOnlineAccess {
                  display: flex;
                  flex-direction: column;
                  }
      
                  
      
                  #size-selector {
                  width: -webkit-fill-available;
                  display: flex;
                  flex-direction: row;
                  flex-wrap: wrap;
                  margin-top: 10px;
                  position: relative;
                  }
      
                  #size-selector label {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      height: 40px;
                      width: 53px;
                      margin: 1px;
                      background-color: #f2f2f2;
                      cursor: pointer;
                      transition: background-color 0.3s;
                      color: #252525;
                      text-align: center;
                      border-radius: 3px;
                  }
      
                  #size-selector input[type="radio"] {
                      display: none;
                  }
      
                  #size-selector input[type="radio"]:checked + label {
                      background-color: #252525;
                      color: white;
                  }
      
                  #size-selector label:hover {
                      background-color: #007bff;
                      color: white;
                  }
              
                  #hasRegionalBrand-options input {
                  position: absolute;
                  opacity: 0;
                  height: 0;
                  width: 0;
                  }
      
                  #hasRegionalBrand-options label {
                  position: relative;
                  }
      
                  .checkmark{
                  display: block;
                  height: 20px;
                  width: 20px;
                  background-color: transparent;
                  border: 2px, solid, #f2f2f2;
                  border-radius: 100%;
                  
                  }
      
                  #hasRegionalBrand-options {
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  gap: 40px;
                  margin-top: 10px;
                  }
                  
                  #hasRegionalBrand-options label {
                  display: flex;
                  flex-direction: row-reverse;
                  align-items: center;
                  gap: 10px;
                  }
      
                  #hasRegionalBrand-options input:checked + label .checkmark {
                  border: 2px, solid, #252525;
                  background: radial-gradient(circle, #252525 35%, transparent 40%)
                  }
      
                  #calculeText {
                  color: #f2f2f2;
                  text-align: center;
                  margin-top: 10px;
                  font-weight: bold;
                  }
                  
                  #ticket-container {
                  display: flex;
                  flex-direction: column;
                  width: 250px;
                  margin-right: 20px;
                  }
      
      
                  #ticket-selector {
                  display: flex;
                  flex-direction: row;
                  flex-wrap: wrap;
                  margin-top: 10px;
                  }
      
                  #ticket-selector label {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      height: 45px;
                      width: 60px;
                      margin: 2px;
                      background-color: #f2f2f2;
                      cursor: pointer;
                      transition: background-color 0.3s;
                      color: #252525;
                      text-align: center;
                      border-radius: 3px;
                  }
      
                  #ticket-selector input[type="radio"] {
                      display: none;
                  }
      
                  #ticket-selector input[type="radio"]:checked + label {
                      background-color: #252525;
                      color: white;
                  }
      
                  #ticket-selector label:hover {
                      background-color: #007bff;
                      color: white;
                  }
      
                  .labelTextField {
                  position: relative;
                  height: 0 !important;
                  width: 0 !important;
                  }
      
                  .labelText {
                  position: absolute;
                  top: 6px;
                  left: 3px;
                  z-index: 10;
                  font-size: 9px;
                  color: #b3b3b3;
                  width: 50px;
                  }
      
      
                  .optionTextField {
                  position: absolute !important;
                  top: 0 !important;
                  left: 0px !important;
                  height: 44px !important;
                  width: 80px !important;
                  padding-top: 20px !important;
                  padding-bottom: 2px !important;
              padding-left: 6px !important;
              border-radius: 3px !important;
              margin-top: 0px !important;
              border: 0px !important; 
              
              }
      
              .optionTextField::placeholder {
              position: absolute;
              top: 22px;
              left: 6px;
        }

               #storeSizeLabel {
            position: relative;
            }

            #storeSizeTooltip {
            position: absolute;
            display: block;
            font-size: 8px;
            text-align: center;
            top: 0px;
            right: -18px;
            height: 13px;
            width: 13px;
            background-color: rgba(256, 256, 256, 0.5);
            line-height: 14px;
            letter-spacing: 1px;
            -moz-border-radius: 30px;
            border-radius: 30px;
            }

            #tooltip-container {
            position: absolute;
            top: -10px;
            right: 0px;
            background-color: #f2f2f2;
            color: #303030;
            border-radius: 10px;
            padding: 10px;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            gap: 6px;
            }

            #tooltip-container p {
            margin-bottom: 0px !important
            }
              
          
          }
          `;
              document.head.appendChild(styleMobile);
        } else {
            const style = document.createElement('style');
            style.textContent = `
        
           body {
               
                font-family: Arial, sans-serif;
            }
            #main-container {
                background-color: #b72776;
                border-radius: 32px;
                width: 468px;
                color: white;  
            }
            #form-container, #resultContainer {
               display: flex;
               justify-content: center;
               padding: 30px;
               padding-bottom: 0px;
              
    
            }
            #calculatorForm {
               display: flex;
               justify-items: center;
               flex-direction: row;
               flex-wrap: wrap;
               gap: 20px;
               row-gap: 10px;
               width: 400px;
    
    
            }
               
            form {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
    
            .result {
                margin: 5px 0;
            }
    
            input {
            font-size: 14px !important;
            }
    
            
    
            input[type="text"], input[type="email"] {
            margin-top: 10px !important; 
            height: 40px !important; 
            padding: 10px !important;
            display: flex !important;  
            border-radius: 6px !important;
            outline: none !important;
            border: none !important;
            
            }
    
            #faturamento, #numOfStores, #numOfOnlineAccess {
            margin-top: 10px !important; 
            height: 40px !important; 
            padding: 10px !important;
            display: flex !important;  
            border-radius: 6px !important;
            outline: none !important;
            border: none !important;
            }
    
            label {
            font-size: 14px !important;
            }
    
            .numOfOnlineAccess label {
            font-size: 14px !important;
            width: 160px !important;
            }
    
            select {
            height: 40px;
            padding: 5px;
            display: flex;  
            border-radius: 6px;
            outline: none;
            border: none;
            }
    
            .submitFormButton {
            height: 40px !important;
            width: 100px !important; 
            padding: 5px !important;
            border-radius: 50px !important;
            background-color: #303030 !important;
            color: white !important;
            border: none !important;
            cursor: pointer !important;
            margin: auto !important;
            margin-top: 30px !important;
            margin-bottom: 30px !important;
            }
    
            .storeSegment {
            margin-right: 200px !important ;
            margin-bottom: 0px !important;
            }
    
            .name, .name input, .function, .function input  {
            width: 150px !important;
            margin-right: 20px !important;
            }

            
           
    
            .email, .company, .email input, .company input {
            width: 198px !important;
            }
    
            #numOfStores, #numOfStores input {
            width: 64px !important;
            }
    
            .storeSegment, .storeSegment select {
            width: 220px !important;
            
            }
    
            .storeSegment select {
            width: 220px !important;
            margin-top: 10px !important;
            }
    
            .storeSegment {
            position: relative;
            }
    
            // .storeSegment::after {
            // content: '';
            // display: block; 
            // width: 375px; 
            // height: 1px;
            // background-color: white; 
            // position: absolute; 
            // bottom: -30px; 
            // left: 0px; 
           
            // }
    
            .faturamento, .faturamento input {
            width: 148px !important;
            margin-right: 20px !important;
            }
    
            .numOfOnlineAccess, .numOfOnlineAccess input {
            width: 148px !important;
            margin-right: 20px !important;
            }
    
            .numOfOnlineAccess {
            display: flex;
            flex-direction: column;
            }
    
            
    
            #size-selector {
            width: 170px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin-top: 10px;
            position: relative;
            }
    
            #size-selector label {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 40px;
                width: 53px;
                margin: 1px;
                background-color: #f2f2f2;
                cursor: pointer;
                transition: background-color 0.3s;
                color: #252525;
                text-align: center;
                border-radius: 3px;
            }
    
            #size-selector input[type="radio"] {
                display: none;
            }
    
            #size-selector input[type="radio"]:checked + label {
                background-color: #252525;
                color: white;
            }
    
            #size-selector label:hover {
                background-color: #007bff;
                color: white;
            }
           
            #hasRegionalBrand-options input {
            position: absolute;
            opacity: 0;
            height: 0;
            width: 0;
            }
    
            #hasRegionalBrand-options label {
            position: relative;
            }
    
            .checkmark{
            display: block;
            height: 20px;
            width: 20px;
            background-color: transparent;
            border: 2px, solid, #f2f2f2;
            border-radius: 100%;
            
            }
    
            #hasRegionalBrand-options {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 40px;
            margin-top: 10px;
            }
            
            #hasRegionalBrand-options label {
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            gap: 10px;
            }
    
            #hasRegionalBrand-options input:checked + label .checkmark {
            border: 2px, solid, #252525;
            background: radial-gradient(circle, #252525 35%, transparent 40%)
            }
    
            #calculeText {
            color: #f2f2f2;
            text-align: center;
            margin-top: 8px;
            font-weight: regular;
            font-size: 9px;
            line-height: 11px;
            }
            
             #ticket-container {
            display: flex;
            flex-direction: column;
            }
    
    
            #ticket-selector {
            width: 200px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin-top: 10px;
            }
    
            #ticket-selector label {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 45px;
                width: 60px;
                margin: 2px;
                background-color: #f2f2f2;
                cursor: pointer;
                transition: background-color 0.3s;
                color: #252525;
                text-align: center;
                border-radius: 3px;
            }
    
            #ticket-selector input[type="radio"] {
                display: none;
            }
    
            #ticket-selector input[type="radio"]:checked + label {
                background-color: #252525;
                color: white;
            }
    
            #ticket-selector label:hover {
                background-color: #007bff;
                color: white;
            }
    
            .labelTextField {
            position: relative;
            height: 0 !important;
            width: 0 !important;
            }
    
            .labelText {
             position: absolute;
            top: 6px;
            left: 3px;
            z-index: 10;
            font-size: 9px;
            color: #b3b3b3;
            width: 50px;
            }
    
    
            .optionTextField {
            position: absolute !important;
            top: 0 !important;
            left: 0px !important;
            height: 44px !important;
            width: 80px !important;
            padding-top: 20px !important;
            padding-bottom: 2px !important;
            padding-left: 6px !important;
            border-radius: 3px !important;
            margin-top: 0px !important;
            border: 0px !important; 
            
            }
    
            .optionTextField::placeholder {
            position: absolute;
            top: 22px;
            left: 6px;
            }

            #storeSizeLabel {
            position: relative;
            }

            #storeSizeTooltip {
            position: absolute;
            display: block;
            font-size: 8px;
            text-align: center;
            top: 0px;
            right: -18px;
            height: 13px;
            width: 13px;
            background-color: rgba(256, 256, 256, 0.5);
            line-height: 14px;
            letter-spacing: 1px;
            -moz-border-radius: 30px;
            border-radius: 30px;
            }

            #tooltip-container {
            position: absolute;
            top: -10px;
            right: 0px;
            background-color: #f2f2f2;
            color: #303030;
            border-radius: 10px;
            padding: 10px;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            gap: 6px;
            }

            #tooltip-container p {
            margin-bottom: 0px !important
            }
        
        `;
            document.head.appendChild(style);
        }
        



        const form = document.createElement('form');
        form.setAttribute('id', 'calculatorForm');

        function createInputField(type, name, labelName, placeholder) {
            // Criação do contêiner principal
            const inputContainer = document.createElement('div');
            inputContainer.setAttribute('id', 'input-container');
            inputContainer.setAttribute('class', name)


            const label = document.createElement('label');
            label.setAttribute('for', name);
            label.textContent = labelName;

            const input = document.createElement('input');
            input.setAttribute('type', type);
            input.setAttribute('name', name);
            input.setAttribute('id', name);
            input.setAttribute('placeholder', placeholder);
            input.setAttribute('required', 'true');

            if (name === 'faturamento') {
                input.addEventListener('keyup', () => {
                    var valorAlterado = input.value;
                    valorAlterado = valorAlterado.replace(/\D/g, ""); // Remove todos os não dígitos
                    valorAlterado = valorAlterado.replace(/(\d+)(\d{2})$/, "$1,$2"); // Adiciona a parte de centavos
                    valorAlterado = valorAlterado.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Adiciona pontos a cada três dígitos
                    valorAlterado = "R$" + valorAlterado;
                    input.value = valorAlterado;
                });
            }
            if (name === 'numOfOnlineAccess') {
                input.addEventListener('input', (event) => {
                    let cursorPosition = input.selectionStart;
                    let valor = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
                    if (valor.length > 10) {
                        valor = valor.slice(0, 10); // Limita a entrada a 10 dígitos
                    }
                    if (valor) {
                        const valorNumerico = parseInt(valor);
                        const valorFormatado = valorNumerico.toLocaleString('pt-BR');
                        input.value = valorFormatado;
                        // Ajusta a posição do cursor
                        cursorPosition += valorFormatado.length - valor.length;
                        input.setSelectionRange(cursorPosition, cursorPosition);
                    } else {
                        input.value = '';
                    }
                });
            }
        

            inputContainer.appendChild(label)
            inputContainer.appendChild(input)
            form.appendChild(inputContainer);

            return inputContainer;

        }



        function createSelectField(name, placeholder, options) {

            const selectContainer = document.createElement('div');
            selectContainer.setAttribute('id', 'select-container');
            selectContainer.setAttribute('class', name)

            const label = document.createElement('label');
            label.setAttribute('for', name);
            label.textContent = placeholder;

            const select = document.createElement('select');
            select.setAttribute('name', name);
            select.setAttribute('id', name);
            select.setAttribute('required', 'true')


            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.setAttribute('value', option);
                optionElement.textContent = option;
                select.appendChild(optionElement);
            });

            selectContainer.appendChild(label)
            selectContainer.appendChild(select)
            form.appendChild(selectContainer);

            return select

        }

        function createParagraph (id, text) {
            const paragraph = document.createElement('p');
            paragraph.setAttribute('id', id);
            paragraph.textContent = text
            return paragraph;
        }


        function createRadioFieldContainer() {
            const sizeContainer = document.createElement('div');
            sizeContainer.setAttribute('id', 'size-container')

            const sectionLabel = document.createElement('label');
            sectionLabel.textContent = 'Tamanho da Loja'
            sectionLabel.setAttribute("id", "storeSizeLabel")

            function createTooltip(){
                const tooltipContainer = document.createElement('div');
                tooltipContainer.setAttribute('id', 'tooltip-container');
        
                const tooltipText1 = createParagraph('tooltip-text-1', 'Loja PP: 1-2 vendedores por loja.')
                const tooltipText2 = createParagraph('tooltip-text-2', 'Lojas P:2-3 vendedores por loja.')
                const tooltipText3 = createParagraph('tooltip-text-3', 'Lojas M: 3-4 vendedores por loja.')
                const tooltipText4 = createParagraph('tooltip-text-4', 'Lojas G:  5 ou mais vendedores por loja.')
                const tooltipText5 = createParagraph('tooltip-text-5', 'Lojas GG: 10 ou mais vendedores por loja.')
                
                tooltipContainer.appendChild(tooltipText1)
                tooltipContainer.appendChild(tooltipText2)
                tooltipContainer.appendChild(tooltipText3)
                tooltipContainer.appendChild(tooltipText4)
                tooltipContainer.appendChild(tooltipText5)
                sizeSelector.appendChild(tooltipContainer)
            }
            

            const tooltip = document.createElement("span")
            tooltip.textContent = '?'
            tooltip.setAttribute('id', 'storeSizeTooltip')

            if(mediaSize.matches) {
                tooltip.addEventListener('click', () => {
                    createTooltip();
                })
    
            } else {
                tooltip.addEventListener('mouseover', () => {
                    createTooltip();
                })
            };
           

            tooltip.addEventListener('mouseleave', () => {
                document.getElementById('tooltip-container').remove();
            })
          

            sectionLabel.appendChild(tooltip);
            sizeContainer.appendChild(sectionLabel);

            const sizeSelector = document.createElement('div');
            sizeSelector.setAttribute('id', 'size-selector');
            sizeContainer.appendChild(sizeSelector);
            form.appendChild(sizeContainer);
            return sizeSelector;
        }

        function createRadioFieldRegionalBrand(name, label, options) {

            const container = document.createElement('div');
            container.setAttribute('id', 'hasRegionalBrand-container');
            container.setAttribute('class', name)

            const optionsContainer = document.createElement('div');
            optionsContainer.setAttribute('id', 'hasRegionalBrand-options');
            optionsContainer.setAttribute('class', name)

            const sectionLabel = document.createElement('label');
            sectionLabel.textContent = label;
            container.appendChild(sectionLabel);
            // Cria os inputs de radio e labels
            options.forEach(option => {
                const input = document.createElement('input');
                input.type = 'radio';
                input.id = option.toLowerCase();
                input.className = name;
                input.name = name
                input.value = option;
                input.setAttribute('required', 'true')

                const label = document.createElement('label');
                label.htmlFor = option.toLowerCase();
                label.innerText = option;

                const span = document.createElement('span');
                span.className = 'checkmark'

                label.appendChild(span)
                optionsContainer.appendChild(input);
                optionsContainer.appendChild(label);
                container.appendChild(optionsContainer);
                form.appendChild(container);


            });



        }

        function createRadioField(name, label, options, sizeSelector) {

            sizeSelector.innerHTML = '';



            // Cria os inputs de radio e labels
            options.forEach(option => {
                const input = document.createElement('input');
                input.type = 'radio';
                input.id = option.toLowerCase();
                input.className = 'option';
                input.name = 'storeSize'
                input.value = option;
                input.setAttribute('required', 'required')

                const label = document.createElement('label');
                label.htmlFor = option.toLowerCase();
                label.innerText = option;

                sizeSelector.appendChild(input);
                sizeSelector.appendChild(label);


            });



        }


        function createRadioFieldAverageTicket(name, label, options) {

            const ticketContainer = document.createElement('div');
            ticketContainer.setAttribute('id', 'ticket-container')

            const sectionLabel = document.createElement('label');
            sectionLabel.textContent = 'Ticket Médio'
            ticketContainer.appendChild(sectionLabel);

            const ticketSelector = document.createElement('div');
            ticketSelector.setAttribute('id', 'ticket-selector');
            ticketContainer.appendChild(ticketSelector);


            // Cria os inputs de radio e labels
            options.forEach(option => {

                if (option === 'Outro valor') {
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.id = option.toLowerCase();
                    input.className = 'option';
                    input.name = 'averageTicket'
                    input.value = option;
                    input.setAttribute('required', 'true')

                    const label = document.createElement('label');
                    label.htmlFor = option.toLowerCase();
                    label.className = 'labelTextField'


                    const labelText = document.createElement('span')
                    labelText.innerHTML = option;
                    labelText.className = 'labelText'

                    const textInput = document.createElement('input');
                    textInput.type = 'number';
                    textInput.id = 'outroValor'
                    textInput.className = 'optionTextField'
                    textInput.name = 'averageTicket'
                    textInput.placeholder = '000'


                    label.appendChild(labelText);
                    label.appendChild(textInput);
                    ticketSelector.appendChild(input);
                    ticketSelector.appendChild(label);

                    textInput.addEventListener('focus', () => {
                        input.checked = true;
                    })




                } else {

                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.id = option.toLowerCase();
                    input.className = 'option';
                    input.name = 'averageTicket'
                    input.value = option;

                    const label = document.createElement('label');
                    label.htmlFor = option.toLowerCase();
                    label.innerText = option;
                    ticketSelector.appendChild(input);
                    ticketSelector.appendChild(label);
                }



            });



            form.appendChild(ticketContainer);

        }

        const selectField = createSelectField('storeSegment', 'Segmento', [
            'Restaurante',
            'Cinema',
            'Casa',
            'Moda',
            'Viagem',
            'Pet',
            'Supermercado',
            'Bem-Estar',
            'Drogaria'
        ]);
        createInputField('text', 'faturamento', 'Faturamento Anual', 'R$ 1.000.000,00');
        createInputField('number', 'numOfStores', 'Número de Lojas', '1');
        const sizeSelector = createRadioFieldContainer();
        createRadioField('storeSize', 'Tamanho da Loja', ['PP', 'P', 'M', 'G', 'GG'], sizeSelector);
        createRadioFieldRegionalBrand('hasRegionalBrand', 'Possui Marca Regional', ['sim', 'não'])
        const acessosInput = createInputField('text', 'numOfOnlineAccess', 'Acessos ao e-commerce', '250.000');
        const calculeText = document.createElement('a');
        calculeText.textContent = "Não sabe os acessos? Confira aqui.";
        calculeText.setAttribute('id', 'calculeText');
        calculeText.setAttribute('href', 'https://www.similarweb.com/')
        calculeText.setAttribute('target', '_blank')
        acessosInput.appendChild(calculeText);
        createRadioFieldAverageTicket('number', 'averageTicket', ['100', '150', '250', '350', 'Outro valor'])
        // Adiciona um ouvinte de evento para a mudança de seleção
        selectField.addEventListener('change', function () {
            const selectedSegment = selectField.value;
            let storeSizeOptions;

            switch (selectedSegment) {
                case 'Drogaria':
                    storeSizeOptions = ['PP'];
                    break;
                case 'Supermercado':
                    storeSizeOptions = ['PP', 'G', 'GG'];
                    break;
                default:
                    storeSizeOptions = ['PP', 'P', 'M', 'G', 'GG'];
                    break;
            }
            // Atualiza os radio buttons
            createRadioField('storeSize', 'Tamanho da Loja', storeSizeOptions, sizeSelector);
        });

        
       

        const formScriptUrl = "https://script.google.com/macros/s/AKfycbwF1hgdjRKwNSVl5IDxe-EsBPXZwZ4BrwhLFgQwatGQRTQF4W3bUAJpQk9Jp-flScB05A/exec"

        

        const button = document.createElement('button');
        button.textContent = 'Enviar';
        button.setAttribute('type', 'submit');
        button.className = 'submitFormButton';
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            
            const annualBilling = getFormattedValue(document.getElementById('faturamento').value);
            const storeSegment = document.getElementById('storeSegment').value;
            const numOfStores = document.getElementById('numOfStores').value;
            const storeSize = document.querySelector('input[name="storeSize"]:checked').value;
            const averageTicket = document.querySelector('input[name="averageTicket"]:checked').value;
            const hasRegionalBrand = document.querySelector('input[name="hasRegionalBrand"]:checked').value;
            const numOfOnlineAccess = getFormattedValue(document.getElementById('numOfOnlineAccess').value);

            calculateSalePotential(
                annualBilling,
                storeSegment,
                parseInt(numOfStores, 10),
                storeSize,
                parseFloat(averageTicket),
                hasRegionalBrand,
                parseInt(numOfOnlineAccess, 10)
            );

            let requestBody = new FormData(form)
            fetch(formScriptUrl, { method: 'POST', body: requestBody})
            .then(response => {
                console.log('Success!', response)
               
                })
            .catch(error => {
            console.log('Error!', error.message)
               

                }
       )

       return false;
        });

        form.appendChild(button);
        document.getElementById('form-container').appendChild(form);
    }

    createForm();


});
