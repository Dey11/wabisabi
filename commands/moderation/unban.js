const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Select a member and unban them.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to unban")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(0)
    .setDMPermission(false),
  async execute(interaction) {
    try {
      const user = interaction.options.getUser("target");
      const guild = interaction.member.guild;
      const bannedMembers = await guild.bans.fetch();
      bannedMembers.map((bannedMember) => {
        if (user.id === bannedMember.user.id) {
          guild.members.unban(user);
        }
      });
      interaction.reply(`${user.username} has been successfully unbanned!`);
    } catch (error) {
      console.log(error);
    }
  },
};
