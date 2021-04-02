
//declaração de variaveis
var animations = [
    'Criamos\nsoluções digitais\n',
    'profissionais.',
    'para você.',
    'para sua empresa.',
    'que trazem\nresultados reais.',
]; /* The text */
var charIndex, writeSpeed, eraseSpeed, speed, animation_index, txt, writing, first_animation;
var blinkCount, showCursor;

function initTypeAnimation() {
    document.getElementById("header-text-1").innerHTML = "";
    document.getElementById("header-text-2").innerHTML = "";

    charIndex = 0;          //posição do caractere atual
    writeSpeed = 50;        //delay de escrita entre cada caractere
    eraseSpeed = 30;        //delay para apagar cada caractere
    speed = writeSpeed;     /* The speed/duration of the effect in milliseconds */
    animation_index = 0;    //indica qual frase estamos animando
    txt = animations[animation_index]; // inicia com primeira frase
    writing = true;                     //indica modo escrita se TRUE, mode para apagar de FALSE
    first_animation = true;             //indica se é a primeira frase que estamos animando

    blinkCount = 0;
    showCursor = true;

    typeWriter();
}

function typeWriter() {
    if(first_animation) { //entra aqui apenas se estamos escrevendo a primeira frase
        if (charIndex < txt.length) { //se ainda naõ terminou de escrever, adiciona um caractere no final
            let htmlStr = document.getElementById("header-text-1").innerHTML;
            htmlStr += txt.charAt(charIndex)=='\n'?'<br>':txt.charAt(charIndex); //adiciona <br> no lugar de /n para pular linha
            document.getElementById("header-text-1").innerHTML = htmlStr; //atualiza DOM
            charIndex++;    //pula para proximo caractere
        }else{ //entra aqui se terminou a escrita da primeira frase
            animation_index++; //pula para proxima frase a ser animada
            txt = animations[animation_index]; //atualiza txt com proxima frase
            charIndex = 0;                      //reseta variavel
            first_animation = false;            //indica que ja terminamos a primeira frase
        }
        setTimeout(typeWriter, speed); //configura pra chamar essa função novamente depois de X milisegundos
    }
    else { //entra aqui para todas as frases após a primeira, pois estas devem escritas e tambem apagadas na animação
        //se ainda não terminou de escrever, e se não terminou a quantidade de frases animadas
        if (charIndex < txt.length && animation_index < animations.length) {
            let htmlStr = document.getElementById("header-text-2").innerHTML;
            if(writing) { //se modo writing, adiciona caractere no final
                htmlStr += txt.charAt(charIndex)=='\n'?'<br>':txt.charAt(charIndex);
            } 
            else {//erasing, apaga caractere no final
                htmlStr = htmlStr.substring(0, htmlStr.length-1);
            }
            //atualiza no DOM
            document.getElementById("header-text-2").innerHTML = htmlStr;
            //aponta para o proximo caractere da frase
            charIndex++;

            if(charIndex == txt.length) { //se esse foi o ultimo caractere dessa frase
                charIndex = 0;            //reseta variavel
                if(writing) {   //se estava escrevendo, agora configuramos para apagar
                    writing = false; //false para apagar
                    speed = eraseSpeed; //ajusta para velocidade apagando
                    setTimeout(blinkCursorWriter, speed); //configura para chamar Cursor Piscante após X milisegundos
        
                }
                else {    //se estava apagando, agora configuramos para escrever
                    writing = true; //true para escrever na proxima vez
                    animation_index++; //aponta para a proxima frase que iremos começar a escrever
                    txt = animations[animation_index]; //atualiza txt com a proxima frase a ser animada
                    speed = writeSpeed; //seta com velocidade de escrita
                    setTimeout(typeWriter, speed); //configura para chamar essa função após X milisegundos
                }
            }else {
                //para escrever proximo caractere,configura para chamar essa função novamente após X milisegundos
                setTimeout(typeWriter, speed); 
            }
        }
    }
}


function blinkCursorWriter(){
    let htmlStr = document.getElementById("header-text-2").innerHTML;
    if(showCursor) {
        htmlStr += '|'; //insere o cursor no final
    } 
    else {//erase last char
        htmlStr = htmlStr.substring(0, htmlStr.length-1); //apaga o cursor no final
    }
    //atualiza o DOM
    document.getElementById("header-text-2").innerHTML = htmlStr;
    showCursor = !showCursor; //inverte estado de visibilidade do cursor
    blinkCount++;
    //descomentar linhas com 'lastAnimation' para o cursor piscar infinitamente
    //let lastAnimation = !(animation_index < (animations.length-1));
    if(blinkCount < 6 /*|| lastAnimation*/) {
        setTimeout(blinkCursorWriter, 300); //configura para chamar essa função novamwente em X milisegundos
    }
    else { //terminou de piscar
        blinkCount = 0;
        if(animation_index < (animations.length-1)) //chamar typeWriter para iniciar proxima animação.
            setTimeout(typeWriter, speed);
        else{
            //se era a ultima animação, faz mais nada, acabou aqui.
            //se quiser repetir toda a animação, só chamar initTypeAnimation() aqui
            //initTypeAnimation()
        }
    }
}

//inicia a animação
initTypeAnimation()