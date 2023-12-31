const { Events } = require("discord.js");

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    const MemberRole = member.guild.roles.cache.get("1189443866823237755");
    member.roles.add(MemberRole);
  },
};
