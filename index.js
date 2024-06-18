
document.addEventListener('DOMContentLoaded', function () {

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


// Função para criar o formulário
function createForm() {
    const style = document.createElement('style');
    style.textContent = `
       body {
            margin: 20px;
            font-family: Arial, sans-serif;
        }
        #main-container {
            display: flex;
            flex-direction: row;
            justify-content: start;
            gap: 20px;
        }
        #form-container, #resultContainer {
            flex: 1;
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
        height: 30px;
        padding: 5px;
        display: flex;  
        
        }

        select {
        height: 40px;
        padding: 5px;
        }

        button {
        height: 40px;
        padding: 5px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    const form = document.createElement('form');
    form.setAttribute('id', 'calculatorForm');

    function createInputField(type, name, placeholder) {
        const label = document.createElement('label');
        label.setAttribute('for', name);
        label.textContent = placeholder;

        const input = document.createElement('input');
        input.setAttribute('type', type);
        input.setAttribute('name', name);
        input.setAttribute('id', name);
        input.setAttribute('placeholder', placeholder);

        form.appendChild(label);
        form.appendChild(input);
    }

    function createSelectField(name, placeholder, options) {
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

        form.appendChild(label);
        form.appendChild(select);

        select.addEventListener('change', function () {
            if (name === 'storeSegment') {
                    const storeSizeSelect = document.getElementById('storeSize');
                    const selectedSegment = this.value;
                    console.log('Segmento selecionado:', selectedSegment);
        
                    // Remove todas as opções de storeSize
                    while (storeSizeSelect.firstChild) {
                        storeSizeSelect.removeChild(storeSizeSelect.firstChild);
                    }
        
                    // Define as opções de storeSize baseado no segmento selecionado
                    let storeSizeOptions = [];
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
        
                    // Adiciona as novas opções
                    storeSizeOptions.forEach(option => {
                        const optionElement = document.createElement('option');
                        optionElement.value = option;
                        optionElement.textContent = option;
                        storeSizeSelect.appendChild(optionElement);
                    });
            }
        });
       
    }
 
    createInputField('number', 'faturamento', 'Faturamento Anual');
    createSelectField('storeSegment', 'Segmento', [
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
    createInputField('number', 'numOfStores', 'Número de Lojas');
    createSelectField('storeSize', 'Tamanho da Loja', ['PP', 'P', 'M', 'G', 'GG']);
    createInputField('number', 'averageTicket', 'Ticket Médio');
    createInputField('checkbox', 'hasRegionalBrand', 'Marca Regional');
    createInputField('number', 'numOfOnlineAccess', 'Acessos Online');

     

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
