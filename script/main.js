const Modal = {
    open(){
        // Abrir modal
        // Adicionar a class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')

    },
    close(){
        // fechar o modal
        // remover a class active do modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}


const Transaction = {
    all: [
        {
            description: 'Luz',
            amount: -50000,
            date: '23/01/2021'
        },
        {
            description: 'Criação website',
            amount: 500000,
            date: '23/01/2021'
        },
        {
            description: 'Internet',
            amount: -20000,
            date: '23/01/2021'
        }],
    add(transaction) {
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes() {
        let income = 0;
        Transaction.all.map(transaction => {
            if (transaction.amount > 0)
                income += transaction.amount
        })

        return income
    },
    expenses() {
        let expense = 0;
        Transaction.all.map(transaction => {
            if (transaction.amount < 0)
                expense += transaction.amount
        })

        return expense
    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {

    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        // Cria uma nova tag 'tr' vazia
        const tr = document.createElement('tr')

        // Recebe o conteúdo html do método presente no objeto DOM
        tr.innerHTML = DOM.innerHTMLTransation(transaction)

        DOM.transactionsContainer.appendChild(tr)

    },

    innerHTMLTransation(transaction) {

        const cssClasses = transaction.amount > 0 ? 'income' : 'expense'

        const amount = Utils.formatCurrency(transaction.amount)

        const html =
            `        
                <tr>
                    <td class="description">${transaction.description}</td>
                    <td class="${cssClasses}">${amount}</td>
                    <td class="date">${transaction.date}</td>
                        <td>
                            <img src="./assets/minus.svg" alt="Remover transação">
                    </td>
                </tr>
                
            `
        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ''
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : ''

        value = String(value).replace(/\D/g, '')

        value = Number(value) / 100

        value = value.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
        })

        return signal + value
    },
    formatAmount(value) {

    }

}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
    validateFields() {
        const { description, amount, date } = Form.getValues()

        if (description.trim() === '' ||
            amount.trim() === '' ||
            date.trim() === ''
        ) {
            throw new Error('Preencha todos os campos')
        }

    },
    formatValues() {
        let { description, amount, date } = Form.getValues()

        amount = Utils.formatAmount(amount)

    },
    submit(event) {
        event.preventDefault()

        try {
            Form.validateFields()
            Form.formatValues()
        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    }
}

App.init()

Transaction.add({
    description: 'Sabre de luz',
    amount: 400,
    date: '31/02/2080'
})

Transaction.remove(0)