const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Select a member and ban them.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to ban")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(0)
    .setDMPermission(false),
  async execute(interaction) {
    try {
      const user = interaction.options.getUser("target");
      const guild = interaction.member.guild;
      guild.members.ban(user);
      interaction.reply(`${user.username} has been successfully banned!`);
    } catch (error) {
      console.log(error);
    }
  },
};
