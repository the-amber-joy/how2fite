exports.up = async function (sql) {
  await sql`
    INSERT INTO part (name) VALUES ('skin')
    ,('cheek')
    ,('butt')
    ,('gumline')
    ,('hair')
    ,('nose')
    ,('nostril')
    ,('ear')
    ,('chin')
    ,('teeth')
    ,('elbow')
    ,('fist')
    ,('foot')
    ,('knee')
    ,('toes')
    ,('toenail')
    ,('mouth')
    ,('neck')
    ,('ojos')
    ,('hand')
    ,('arm')
    ,('wrist')
    ,('ankle')
    ,('leg')
    ,('finger');  
  `;
};


exports.down = async function (sql) {
  await sql`
    DROP TABLE IF EXISTS part;
    DROP TABLE IF EXISTS action;
  `
}

