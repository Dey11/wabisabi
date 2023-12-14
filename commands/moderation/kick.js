const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Select a member and kick them.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to kick")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(0)
    .setDMPermission(false),
  async execute(interaction) {
    try {
      const user = interaction.options.getMember("target");
      user.kick();
      interaction.reply(`User has been successfully kicked!`);
    } catch (error) {
      console.log(error);
    }
  },
};
