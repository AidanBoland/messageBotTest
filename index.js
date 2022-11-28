import Discord from "discord.js";
import { GatewayIntentBits } from "discord.js";
const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

import fs from "fs";

import prompt from "prompt";

import chalk from "chalk";
import { exit } from "process";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  // client.channels.cache.get(`${JSON.parse(fs.readFileSync('data.json')).working_channel}`).send('yaboi has connected');
  let channels = guild.channels.cache;
  channels = channels.map((c) => c.type === "GUILD_TEXT");
  channels = channels.values();
});

client.on("messageCreate", async (message) => {
  if (!message?.author.bot) {
    console.log(
      chalk.redBright(
        chalk.bold(`> ${message.author.tag} `) +
          chalk.bold.dim(`(${message.author}) `) +
          chalk.bold(`says: `) +
          chalk.cyan(`${message.content}`)
      )
    );
  }
});

process.stdin.on("terminalInput", (terminalInput) => {
  if (terminalInput.toString() === "ls\n") {
    console.log(channels.na);
    console.log(client.channels.cache.values().name);
  } else if (terminalInput.toString() === "cd\n") {
    prompt.start();
    prompt.get("Channel", function (err, result) {
      if (err) {
        return onErr(err);
      }
      fs.writeFileSync(
        "data.json",
        JSON.stringify({ working_channel: `${result.Channel}` })
      );
    });
    exit;
  } else if (
    !terminalInput.toString().match(/\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d/) &&
    terminalInput.toString() != "\r"
  ) {
    // console.log(`sending ${terminalInput.toString()}`);
    client.channels.cache
      .get(`${JSON.parse(fs.readFileSync("data.json")).working_channel}`)
      .send(terminalInput.toString());
  }
});

client.login(`${process.env.CLIENT_TOKEN}`);
