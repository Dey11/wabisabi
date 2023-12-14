const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Delete messages.")
    .addIntegerOption((option) =>
      option
        .setName("amt")
        .setDescription("Number of messages to be deleted.")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(0),
  async execute(interaction) {
    try {
      const amount = await interaction.options.getInteger("amt");
      if (isNaN(amount) || amount < 1 || amount > 100) {
        return interaction.reply(
          "Please provide a valid number between 1 and 100 for the amount."
        );
      }
      const channel = await interaction.member.guild.channels.fetch(
        interaction.channelId
      );
      // Fetch the last 'amount + 1' messages (to include the command message itself)
      const messages = await channel.messages.fetch({ limit: amount + 1 });

      // Delete the fetched messages
      await channel.bulkDelete(messages);

      interaction.reply(`Deleted ${amount} messages.`);
    } catch (error) {
      console.log(error.message);
      interaction.reply("An error occurred while deleting messages.");
    }
  },
};
