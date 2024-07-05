

document.addEventListener('DOMContentLoaded', function () {


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


        let corporativoResultMonthly = hasRegionalBrand ? (annualBilling / 5000 * 0.10) : (annualBilling / 5000);
        const corporativoResultYearly = corporativoResultMonthly * 14;

        let ecommerceResultMonthly = storeSegment === "Restaurante"
            ? (numOfOnlineAccess / 1000 * averageTicket)
            : (numOfOnlineAccess / 1000 * 0.08 * averageTicket);
        const ecommerceResultYearly = ecommerceResultMonthly * 14;

        const totalMonthly = lojaResultMonthly + corporativoResultMonthly + ecommerceResultMonthly;
        const totalYearly = lojaResultYearly + corporativoResultYearly + ecommerceResultYearly;

        printOnScreenResult(`Loja - Mensal: ${lojaResultMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
        printOnScreenResult(`Loja - Anual: ${lojaResultYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);

        printOnScreenResult(`Corporativo - Mensal: ${corporativoResultMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
        printOnScreenResult(`Corporativo - Anual: ${corporativoResultYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);

        printOnScreenResult(`E-commerce - Mensal: ${ecommerceResultMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
        printOnScreenResult(`E-commerce - Anual: ${ecommerceResultYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);

        printOnScreenResult(`Total - Mensal: ${totalMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
        printOnScreenResult(`Total - Anual: ${totalYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
        
    }


    // Função para imprimir o resultado na tela
    function printOnScreenResult(result) {
        console.log(result)
        
    }

    function createResultModal(lojaResultMonthly, lojaResultYearly, corporativoResultMonthly, corporativoResultYearly, ecommerceResultMonthly, ecommerceResultYearly, totalMonthly, totalYearly) {
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
        z-index: 30;
        }
        
        #modal-container {
        background-color: #f2f2f2;
        width: 75%;
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

        #result-table {
        
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
        
        
        `
        document.head.appendChild(style);
        // Criação do modal para o resultado
        const background = document.createElement('div');
        background.setAttribute('id', 'modal-background');

        const modal = document.createElement('div');
        modal.setAttribute('id', 'modal-container');

        const title = document.createElement('h1');
        title.innerText = "Quer saber mais detalhes da sua projeção?"
        title.setAttribute('id', 'result-title')

        const paragraph = document.createElement('p');
        paragraph.innerText = "Clice no botão abaixo e fala com nosso consultor para montar um Business plan."
        paragraph.setAttribute('id', 'result-paragraph')


        const button = document.createElement('a');
        button.innerHTML = 'Falar com Consultor'
        button.className = 'submitFormButton'
        button.setAttribute('id', 'result-button')

        const table = createTable();
        // const total = createTableTotal()

        document.body.appendChild(background);
        background.appendChild(modal);
        modal.appendChild(table);
        modal.appendChild(title);
        modal.appendChild(paragraph);
        modal.appendChild(button);
        // modal.appendChild(total);
        

    }

    function createTable() {

        // Obtém uma referência ao elemento <div> onde você deseja inserir a tabela
        const div = document.createElement("div");
        div.setAttribute('id', 'result-container');

        // Cria o elemento <table>
        const table = document.createElement("table");
        table.className = 'result-table'
       

        // Cria as células da tabela (4 linhas x 3 colunas)
        const headerRow = table.insertRow(); // Insere a linha do cabeçalho
        const headerCells = ["Canal de venda", "Mensal", "Anual"];
        headerCells.forEach((text) => {
            const cell = headerRow.insertCell();
            cell.className = text;
            cell.appendChild(document.createTextNode(text));
        });

        // Dados das outras linhas
        const data = [
            ["Loja", "R$ 210.000,00", "R$ 2.210.000,00"],
            ["E-commerce", "R$ 210.000,00", "R$ 2.210.000,00"],
            ["Corporativo", "R$ 210.000,00", "R$ 2.210.000,00"],
            ["","",""],
            ["Total", "R$ 210.000,00", "R$ 2.210.000,00"],
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


    // function createTableTotal() {
    //     const style = document.createElement('style');
    //         style.textContent = `
            
    //         `
    //         document.head.appendChild(style);
    
    //         // Cria o elemento <table>
    //         const table = document.createElement("table");
    //         table.className = 'total-table'
    //         table.border = "1"; // Define a borda da tabela
    
    //         // Cria as células da tabela (4 linhas x 3 colunas)
            
    //         // Dados das outras linhas
    //         const data = ["Total", "R$ 210.000,00", "R$ 2.210.000,00"];
    
    //         // Preenche as células com os dados
            
    //             const row = table.insertRow();
    //             data.forEach((text) => {
    //                 const cell = row.insertCell();
    //                 cell.className = text;
    //                 cell.appendChild(document.createTextNode(text));
    //             });
         
    
            
    
    //         return table;
    
    //     }
    
    


    createResultModal();

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
        const style = document.createElement('style');
        style.textContent = `
       body {
            margin: 20px;
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
        }

        .storeSegment {
        margin-right: 200px !important ;
        margin-bottom: 25px !important;
        }

        .name, .name input, .function, .function input  {
        width: 130px !important;
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

        .storeSegment::after {
        content: '';
        display: block; 
        width: 375px; 
        height: 1px;
        background-color: white; 
        position: absolute; 
        bottom: -30px; 
        left: 0px; 
       
        }

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
        top: 25px;
        left: 6px;
        }

      

    `;
        document.head.appendChild(style);


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

        function createRadioFieldContainer() {
            const sizeContainer = document.createElement('div');
            sizeContainer.setAttribute('id', 'size-container')

            const sectionLabel = document.createElement('label');
            sectionLabel.textContent = 'Tamanho da Loja'
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





        createInputField('text', 'name', 'Nome', 'Roberto');
        createInputField('email', 'email', 'Email', 'contato@todoincomm.com.br');
        createInputField('text', 'function', 'Cargo', 'Gerente');
        createInputField('text', 'company', 'Empresa', 'Todo');
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
        createInputField('number', 'faturamento', 'Faturamento Anual', 'R$ 1.000.000,00');
        createInputField('number', 'numOfStores', 'Número de Lojas', '1');
        const sizeSelector = createRadioFieldContainer();
        createRadioField('storeSize', 'Tamanho da Loja', ['PP', 'P', 'M', 'G', 'GG'], sizeSelector);
        createRadioFieldRegionalBrand('hasRegionalBrand', 'Possui Marca Regional', ['sim', 'não'])
        const acessosInput = createInputField('number', 'numOfOnlineAccess', 'Acessos ao e-commerce', '250.000');
        const calculeText = document.createElement('a');
        calculeText.textContent = "Calcule aqui";
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




        const button = document.createElement('button');
        button.textContent = 'Enviar';
        button.setAttribute('type', 'submit');
        button.className = 'submitFormButton';
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const annualBilling = document.getElementById('faturamento').value;
            const storeSegment = document.getElementById('storeSegment').value;
            const numOfStores = document.getElementById('numOfStores').value;
            const storeSize = document.querySelector('input[name="storeSize"]:checked').value;
            const averageTicket = document.querySelector('input[name="averageTicket"]:checked').value;
            const hasRegionalBrand = document.querySelector('input[name="hasRegionalBrand"]:checked').value;
            const numOfOnlineAccess = document.getElementById('numOfOnlineAccess').value;

            calculateSalePotential(
                parseFloat(annualBilling),
                storeSegment,
                parseInt(numOfStores, 10),
                storeSize,
                parseFloat(averageTicket),
                hasRegionalBrand,
                parseInt(numOfOnlineAccess, 10)
            );
        });

        form.appendChild(button);
        document.getElementById('form-container').appendChild(form);
    }

    createForm();
    

});
