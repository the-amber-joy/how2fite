exports.up = async function (sql) {
  await sql`
    INSERT INTO action (name) VALUES ('punch')
    ,('kick')
    ,('smash')
    ,('sit on')
    ,('pull')
    ,('dodge')
    ,('stomp')
    ,('flick')
    ,('slap')
    ,('crush')
    ,('smack')
    ,('twist')
    ,('fart on')
    ,('tweak')
    ,('spit at')
    ,('pinch')
    ,('yank');
    ,('poke');
    ,('slam');
  `;
};


exports.down = async function (sql) {
  await sql`
    DROP TABLE IF EXISTS action;
  `
}

