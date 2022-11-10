socket.on('responseParticipants', function (data) {
  const userName = $('#userName').val();
  const contentArray = [`<span>${userName} (自分)</span>`]
  const others = data.filter((participant) => participant !== userName).map((participant) => `<span>${participant}</span>`);
  contentArray.push(...others)
  $('#participantsContent').html(contentArray.join('<br>'));
  $('#participantsCount').html(data.length);
});