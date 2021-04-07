$(document).ready(function () {
    
  //eventos pra limpar validação do formulario ao digitar no input
  $('input[name="name"]').on("input", function () {
    let input = $(this);

    if (input.val().match("^[a-zA-Z ]{3,30}$")) {
      input.removeClass("invalid").addClass("valid");
    } else {
      //input.removeClass("valid").addClass("invalid");
    }
  });

  $('input[name="email"]').on("input", function () {
    let input = $(this);
    const regex = /^(([^<>()[\]\\.,;!@#$%¨&*():\s@"]+(\.[^<>()[\]\\.,;:!@#$%¨&*()\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(input.val())) {
      input.removeClass("invalid").addClass("valid");
    } else {
      //input.removeClass("valid").addClass("invalid");
    }
  });

  $('input[name="cell"]').on("input", function () {
    let input = $(this);

    let formatedText = input
      .val()
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
      .replace(/(-\d{4})\d+?$/, "$1");

    input.val(formatedText);

    if (input.val().match(/^[(][0-9]{2}[)]?[ ]?[0-9]{4,5}[-]?[0-9]{4}$/g)) {
      input.removeClass("invalid").addClass("valid");
    } else {
      // input.removeClass("valid").addClass("invalid");
    }
  });

  $('textarea[name="message"]').keyup(function (event) {
    let input = $(this);
    let lengthMessage = $(this).val().length;

    if (lengthMessage > 0) {
      input.removeClass("invalid").addClass("valid");
    } else {
      //input.removeClass("valid").addClass("invalid");
    }
  });

  //função de validação
  function validate() {
    let name = $('input[name="name"]');
    let email = $('input[name="email"]');
    let cell = $('input[name="cell"]');
    let message = $('textarea');

    if (!name.val().match("^[a-zA-Z ]{3,30}$")) {
      name.removeClass("valid").addClass("invalid");
      alert("Erro: nome inválido");
      return false;
    }

    const regex = /^(([^<>()[\]\\.,;!@#$%¨&*():\s@"]+(\.[^<>()[\]\\.,;:!@#$%¨&*()\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(email.val())) {
      email.removeClass("valid").addClass("invalid");
      alert("Erro: email inválido");
      return false;
    }


    if (!cell.val().match(/^[(][0-9]{2}[)]?[ ]?[0-9]{4,5}[-]?[0-9]{4}$/g)) {
      cell.removeClass("valid").addClass("invalid");
      alert("Erro: Telefone inválido");
      return false;
    }

    if (message.val().length <= 0) {
      message.removeClass("valid").addClass("invalid");
      alert("Erro: preencha a mensagem por favor");
      return false;
    }

    return true;
  }

  //evento Prevent Default do formulario
  $("form").submit(function (e) {
    console.log("PREVENT DEFAULT");
    e.preventDefault();
    // Serialize data
    var formData = $(this).serialize();
    console.log("Ajax Request: ", formData);

    if (!validate()) {
      return;
    }
    //return;

    // Make AJAX request
    $.post("enviar-email.php", formData)
      .done(function () {
        //limpa formulario
        $('input[name="name"]').val("");
        $('input[name="email"]').val("");
        $('input[name="cell"]').val("");
        $('textarea[name="message"]').val("");
        //exibe mensagem de sucesso
        alert("Mensagem enviada com sucesso");
      })
      .fail(function () {
        //exibe mensagem de erro
        alert("Erro no envio da mensagem!");
      });
  });

});