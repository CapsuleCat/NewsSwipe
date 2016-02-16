Migrations.add({
  version: 1455650546,
  up: function () {
    var tags = [
      {
        name: 'php',
        image: '/images/tags/php.gif'
      }
    ];

    tags.forEach((tag) => {
      Tags.insert(tag);
    });
  }
});
