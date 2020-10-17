const Database = require('./db.js');
const saveOrphanage = require('./saveOrphanage.js')

Database.then(async (db) => {
    // Inserir dados na tabela
/*     await saveOrphanage(db, {
        lat: "-22.7194364",
        lng: "-43.4597157",
        name: "Diferentão q n abre fds",
        about: "Só felicidade",
        whatsapp: "654654",
        images: [
            "https://images.unsplash.com/photo-1594750018712-77643025beb6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
            "https://images.unsplash.com/photo-1576883600124-64c5aa68b4bc?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
            "https://images.unsplash.com/photo-1598137203989-3152bec01cf4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
        ].toString(),
        instructions: "instruções legais",
        opening_hours: "Horários de visitas das 18h até 8h",
        open_on_weekends: "0"
    })
 */
    // Consultar dados da tabela
    const selectedOrphanages = await db.all("SELECT * FROM orphanages")
    console.log(selectedOrphanages)

/*     // Consultar somente 1 orphanato pelo id
    const orphanage = await db.all("SELECT * FROM orphanages WHERE id = '3'")
    console.log(orphanage)

    // Deletar dado da tabela
    console.log(await db.run()) */
})