
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

        printOnScreenResult(`Loja - Mensal: ${lojaResultMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
        printOnScreenResult(`Loja - Anual: ${lojaResultYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);

        let corporativoResultMonthly = hasRegionalBrand ? (annualBilling / 5000 * 0.10) : (annualBilling / 5000);
        const corporativoResultYearly = corporativoResultMonthly * 14;

        printOnScreenResult(`Corporativo - Mensal: ${corporativoResultMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
        printOnScreenResult(`Corporativo - Anual: ${corporativoResultYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);

        let ecommerceResultMonthly = storeSegment === "Restaurante"
            ? (numOfOnlineAccess / 1000 * averageTicket)
            : (numOfOnlineAccess / 1000 * 0.08 * averageTicket);
        const ecommerceResultYearly = ecommerceResultMonthly * 14;

        printOnScreenResult(`E-commerce - Mensal: ${ecommerceResultMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
        printOnScreenResult(`E-commerce - Anual: ${ecommerceResultYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);

        const totalMonthly = lojaResultMonthly + corporativoResultMonthly + ecommerceResultMonthly;
        const totalYearly = lojaResultYearly + corporativoResultYearly + ecommerceResultYearly;

        printOnScreenResult(`Total - Mensal: ${totalMonthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
        printOnScreenResult(`Total - Anual: ${totalYearly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
    }

    // Criação do contêiner principal
    const mainContainer = document.createElement('div');
    mainContainer.setAttribute('id', 'main-container');
    document.body.appendChild(mainContainer);

    // Criação do contêiner para o formulário
    const formContainer = document.createElement('div');
    formContainer.setAttribute('id', 'form-container');
    document.getElementById('main-container').appendChild(formContainer);

    // Criação do contêiner para o resultado
    const resultContainer = document.createElement('div');
    resultContainer.setAttribute('id', 'resultContainer');
    document.getElementById('main-container').appendChild(resultContainer);

    // Função para imprimir o resultado na tela
    function printOnScreenResult(result,) {
        const resultElement = document.createElement('p');
        resultElement.textContent = result;
        resultElement.setAttribute('class', 'result');
        document.getElementById('resultContainer').appendChild(resultElement);
    }


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
           padding: 30px
          

        }
        #calculatorForm {
           display: flex;
           justify-items: center;
           flex-direction: row;
           flex-wrap: wrap;
           gap: 30px
          
            

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
        height: 40px;
       
        display: flex;  
        border-radius: 6px;
        outline: none;
        border: none;
        
        }

        select {
        height: 40px;
        padding: 5px;
        display: flex;  
        border-radius: 6px;
        outline: none;
        border: none;
        }

        button {
        height: 40px;
        padding: 5px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
        }

        .storeSegment {
        margin-right: 200px;
        margin-bottom: 50px;
        }

        .name, .name input, .function, .function input  {
        width: 150px
        }

       

        .email, .company, .email input, .company input {
        width: 218px;
        }

        .storeSegment, .storeSegment select {
        width: 220px;
        }

        .faturamento, .faturamento input {
        width: 168px;
        }

        #size-selector label {
            padding: 20px 20px;
            margin: 2px;
            background-color: #f2f2f2;
            cursor: pointer;
            transition: background-color 0.3s;
            color: #252525;
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
       

    `;
        document.head.appendChild(style);

        let storeSizeOptions = []

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
            const sizeSelector = document.createElement('div');
            sizeSelector.setAttribute('id', 'size-selector');
            form.appendChild(sizeSelector);
            return sizeSelector;
        }

        function createRadioField(name, label, options, sizeSelector) {

            sizeSelector.innerHTML = '';
            

            // Cria os inputs de radio e labels
            options.forEach(option => {
                const input = document.createElement('input');
                input.type = 'radio';
                input.id = option.toLowerCase();
                input.className = 'option';
                input.value = option;

                const label = document.createElement('label');
                label.htmlFor = option.toLowerCase();
                label.innerText = option;

                sizeSelector.appendChild(input);
                sizeSelector.appendChild(label);

            
            });


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
        createInputField('number', 'numOfStores', 'Número de Lojas', 'Número de Lojas');
        let sizeSelector = createRadioFieldContainer();
        createRadioField('storeSize', 'Tamanho da Loja', ['PP', 'P', 'M', 'G', 'GG'], sizeSelector);
        // Adiciona um ouvinte de evento para a mudança de seleção
        selectField.addEventListener('change', function() {
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
        createInputField('checkbox', 'hasRegionalBrand', 'Marca Regional', 'Marca Regional');
        createInputField('number', 'numOfOnlineAccess', 'Acessos Online', '250.000');
        createInputField('number', 'averageTicket', 'Ticket Médio', 'Ticket Médio');


        




        const button = document.createElement('button');
        button.textContent = 'Calcular';
        button.setAttribute('type', 'submit');
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const annualBilling = document.getElementById('faturamento').value;
            const storeSegment = document.getElementById('storeSegment').value;
            const numOfStores = document.getElementById('numOfStores').value;
            const storeSize = document.getElementById('storeSize').value;
            const averageTicket = document.getElementById('averageTicket').value;
            const hasRegionalBrand = document.getElementById('hasRegionalBrand').checked;
            const numOfOnlineAccess = document.getElementById('numOfOnlineAccess').value;

            document.getElementById('resultContainer').innerHTML = ''; // Limpa resultados anteriores

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
