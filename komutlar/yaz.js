const { EmbedBuilder, PermissionsBitField, Client, CommandInteraction } = require("discord.js");
module.exports = {
    name:"yaz",
    description: 'Bota yazdırmak istediğiniz yazıyı yazdırırsınız',
    type:1,
    options: [
        {
            name:"yaz",
            description:"Bota yazmak istediğiniz şeyi yaptırırsınız",
            type:3,
            required:true
        },
    ],
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
    run: async (client, interaction) => {

        const yazdır = interaction.options.getString("yaz")

        if(!yazdır) return;

        interaction.reply({content: "."}).then(msg => {
            interaction.deleteReply()
        })
      try {
        return interaction.channel.send(String(yazdır))
      } catch (err) {
        interaction.reply({content: "Bir hata oluştu!", ephemeral: true})
        console.log(err)
        return;
      }
}
};