class Tela {
    constructor() {
        function $(txt) {return document.getElementById(txt);}

        this._atualTxt = $("atual-txt");
        this._formulaTxt = $("formula-txt");
        this._formula = "";
        this._atual = "";

        this._atualTxt.innerHTML = "";
    }

    atualizar(num, sinal) {
        /* atualiza os valores na tela da calculadora */
        if (sinal) {
            if (this._atual.length > 0) {
                this._formula += parseFloat(this._atual).toString() + num;
            } else {
                this._formula = this._formula.slice(0, this._formula.length - 1);
                this._formula += num;
            }
            this._formulaTxt.innerHTML = this._formula;
            this.limparAtual();
        } else {
            this._atual = num;
            this._atualTxt.innerHTML = this._atual;
        }        
    }

    limparAtual() {
        /* apaga o valor atual da tela */
        this._atual = "";
        this._atualTxt.innerHTML = "";
    }

    limparTudo() {
        /* apaga o valor da formula da tela */
        this.limparAtual();
        this._formula = "";
        this._formulaTxt.innerHTML = this._formula;
    }

    voltarAtual(estado) {
        /* apaga o último valor inserido na tela */
        if (estado) {
            this._formula = "";
            this._formulaTxt.innerHTML = this._formula;
        } else {
            if (this._atual.length > 0) {
                this._atual = this._atual.slice(0, this._atual.length - 1);
                this._atualTxt.innerHTML = this._atual;
            }
        }
    }

    mostrarResultado(resultado) {
        /* exibe o resultado do cálculo na tela */
        this._atualTxt.innerHTML = resultado;
        this._atual = resultado;
        this._formula = "";

        return true;
    }
}