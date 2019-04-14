$('#make-a-link input').first().focus();
$.ajax({
  url: '/listing',
  dataType: 'json'
}).done(data => {
  const links = $('#active-links');
  const template = $('.link-template').first();
  const keys = Object.keys(data).sort((a, b) => a < b ? -1 : 1);
  const host = location.host;
  for(let link of keys) {
    let clone = template.clone().show();
    clone.find('.link-display-from').attr('href', '/' + link).text(host + '/' + link);
    clone.find('.link-display-to').attr('href', data[link]).text(data[link]);
    clone.find('.action-delete-link').click(function() {
      const form = $(`<form action="/" method="POST">
      <input type="text" name="action" value="delete">
      <input type="text" name="from">
      <input type="submit">
      </form>`);
      $('body').append(form);
      form.find('input').eq(1).val(link);
      form.hide();
      form.submit();
    });
    clone.find('.action-edit-link').click(function() {
      const editor = $('.link-editor-template');
      clone.hide();
      editor.detach().insertAfter(clone).show();
      editor.find('.editor-previous-name').val(link);
      editor.find('.editor-from').val(link);
      editor.find('.editor-to').val(data[link]).focus().select();
    });
    links.append(clone);
  }
  links.show();
});

function editorclose() {
  $('.link-editor-template').hide().prev().show();
}
