<template>
    <div>
        <!-- Componente que usa a prop para passar a mensagem e usa o v-show para esconder/mostrar -->
        <Message :msg="msg" v-show="msg"/>
        <div>
            <!-- Evento de submit que cria o burger -->
            <form id="burger-form" @submit="createBurger">
                <div class="input-container">
                    <label for="nome">Nome do cliente:</label>
                    <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o nome completo">
                </div>
                <div class="input-container">
                    <label for="pao">Escolha o pão:</label>
                    <select name="pao" id="pao" v-model="pao">
                        <option value="">Selecione o seu pão</option>
                        <!-- Loop para imprimir todos os pães -->
                        <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">{{ pao.tipo }}</option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="carne">Escolha a carne do hambúrguer:</label>
                    <select name="carne" id="carne" v-model="carne">
                        <option value="">Selecione o tipo de carne</option>
                        <!-- Loop para imprimir todas as carnes -->
                        <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">{{ carne.tipo }}</option>
                    </select>
                </div>
                <div class="input-container" id="opcionais-container">
                    <label for="opcionais" id="opcionais-title">Escolha os opcionais:</label>
                    <!-- Loop para imprimir todos os opcionais -->
                    <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id">
                        <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional.tipo">
                        <span> {{ opcional.tipo }}</span>
                    </div>
                </div>
                <div class="input-container">
                    <input type="submit" class="submit-btn" value="Montar">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Message from "./Message.vue";

    export default{
        name: "BurgerForm",
        components: {
            Message
        },
        data(){
            return{
                // Dados que vem do backend
                paes: null,
                carnes: null,
                opcionaisdata: null,
                // Dados enviados do frontend
                nome: null,
                pao: null,
                carne: null,
                opcionais: [],
                msg: null
            }
        },
        methods:{
            // Método que pega todos os dados de ingredientes
            async getIngredientes(){
                // Realiza a requisição e trás os dados do json
                const req = await fetch("http://localhost:3000/ingredientes");
                const data = await req.json();
                // Associa os dados com as variaveis de data
                this.paes = data.paes;
                this.carnes = data.carnes;
                this.opcionaisdata = data.opcionais;
            },
            // Método que cria o burger montando um data com os dados pegos dos inputs
            async createBurger(e){
                e.preventDefault();

                const data = {
                    nome: this.nome,
                    carne: this.carne,
                    pao: this.pao,
                    opcionais: Array.from(this.opcionais),
                    status: "Solicitado"
                }
                // Transforma os dados de data em formato JSON
                const dataJson = JSON.stringify(data);
                // Realiza a requisição para criar um burger
                const req = await fetch("http://localhost:3000/burgers", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });
                // Inserindo a mensagem
                const res = await req.json();
                this.msg = `Pedido Nº ${res.id} realizado com sucesso`;
                setTimeout(() => this.msg = "", 3000);

                // Limpa os campos após o cadastro
                this.nome = "";
                this.carne = "";
                this.pao = "";
                this.opcionais = "";
                
            }
        },
        // Função ativada assim que o componente é montado
        mounted () {
            // Chamando a função para trazer todos os ingredientes
            this.getIngredientes()
        }
    }
</script>

<style scoped>
    #burger-form{
        max-width: 400px;
        margin: 0 auto;
    }

    .input-container{
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    label{
        font-weight: bold;
        margin-bottom: 15px;
        color: #222;
        padding: 1px 10px;
        border-left: 4px solid #fcba03;
    }

    input, select{
        padding: 5px 10px;
        width: 300px;
    }

    #opcionais-container{
        flex-direction: row;
        flex-wrap: wrap;
    }

    #opcionais-title{
        width: 100%;
    }

    .checkbox-container{
        display: flex;
        align-items: flex-start;
        width: 50%;
        margin-bottom: 20px;
    }

    .checkbox-container span,
    .checkbox-container input{
        width: auto;
    }

    .checkbox-container span{
        margin-left: 6px;
        font-weight: bold;
    }

    .submit-btn{
        background-color: #222;
        color: #fcba03;
        font-weight: bold;
        border: 2px solid #222;
        padding: 10px;
        font-size: 16px;
        cursor: pointer;
        transition: .5s;
    }

    .submit-btn:hover{
        color: #222;
        background-color: transparent;
    }
</style>