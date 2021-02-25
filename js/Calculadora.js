class Calculadora {
    constructor() {
        this._formula = [];
        this._atual = [];
        this._fracao = false;
        this._posResultado = false;
        this._tela = new Tela();
        this._limiteAtual = 10;
        this._limiteForm = 23;
        
        /*
        limite para tela atual = 10
        limite para tela formula = 23
        */
    }

    inserirNum(num) {
        /* quando um botão de número é pressionado, armazena o número e atualiza a Tela */
        if (this._posResultado) {
            this.zerar();
        }

        if (this._atual.length === 1 && this._atual[0] === 0) {
            this._atual.pop();
        }

        if (this._atual.length < this._limiteAtual) {
            this._atual.push(num);
            this._tela.atualizar(this._atual.join(""), false);
            this._posResultado = false;
        }
    }

    inserirSinal(sinal) {
        /* quando um botão de sinal de operação é pressionado, armazena o sinal e atualiza a Tela */
        if (this._formula.join("").length < this._limiteForm) {
            this._posResultado = false;
            if (this._atual[this._atual.length - 1] === ".") {
                this.voltar();
            }
            if (this._atual.length === 0) {
                if (this._formula.length === 0) {
                    this._formula.push("0");
                    this._tela.atualizar("0", false);
                } else {
                    this._formula.pop();
                }
            } else {
                this._formula.push(this._atual.join(""));
            }
            this._formula.push(sinal);
            this._tela.atualizar(sinal, true);
            this._fracao = false;
            this._atual = [];
        }
    }

    fracionar() {
        /* quando o botão de , é pressionado, transforma o valor atual em fração e atualiza a Tela */
        if (this._fracao === false) {
            if (this._atual.length === 0) {
                this._atual.push("0");
                this._tela.atualizar("0", false);
            }
            this._atual.push(".");
            this._tela.atualizar(this._atual.join(""), false);
            this._fracao = true;
        }
    }

    voltar() {
        /* quando o botão de <= é pressionado, remove o último dígito do valor atual e atualiza a Tela */
        if (this.posResultado === false) {
            this._atual.pop();
        }
        this._tela.voltarAtual(this._posResultado);
    }

    zerar() {
        /* quando o botão C é pressionado, reseta a calculadora e limpa a Tela */
        this._atual = [];
        this._formula = [];
        this._fracao = false;
        this._tela.limparTudo();
    }

    calcular() {
        /* quando o botão = é pressionado, realiza o calcula e atualiza a Tela */
        let resultado = 0;
        let tamFormula = this._formula.length % 2;

        if (this._atual.length === 0) {
            if (this._formula.length === 0) {
                this._tela.mostrarResultado(resultado);
            } else {
                resultado = parseFloat(this._formula[0]);
            }
        } else {
            this._formula.push(this._atual.join(""));
            resultado = parseFloat(this._formula[0]);
        }

        if (tamFormula === 0) {
            for (let i = 0; i < this._formula.length - 2; i += 2) {
                switch (this._formula[i + 1]) {
                    case "+":
                        resultado += parseFloat(this._formula[i + 2]);
                        break;
                    case "-":
                        resultado -= parseFloat(this._formula[i + 2]);
                        break;
                    case "*":
                        resultado *= parseFloat(this._formula[i + 2]);
                        break;
                    case "/":
                        resultado /= parseFloat(this._formula[i + 2]);
                        break;
                    default:
                        break;
                }
            }
        } else {
            for (let i = 0; i < this._formula.length; i += 2) {
                switch (this._formula[i + 1]) {
                    case "+":
                        resultado += parseFloat(this._formula[i + 2]);
                        break;
                    case "-":
                        resultado -= parseFloat(this._formula[i + 2]);
                        break;
                    case "*":
                        resultado *= parseFloat(this._formula[i + 2]);
                        break;
                    case "/":
                        resultado /= parseFloat(this._formula[i + 2]);
                        break;
                    default:
                        break;
                }
            }
        }

        if (resultado.toString().length > this._limiteAtual) {
            resultado = resultado.toPrecision(3);
        }

        this._atual = [resultado];
        this._formula = [];
        this._tela.atualizar("=", true);
        this._posResultado = this._tela.mostrarResultado(resultado.toString());
    }
}