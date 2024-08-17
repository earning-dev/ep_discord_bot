import { EmbedBuilder } from 'discord.js';

export function formatDate(date: Date) {
  const dateFormat = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const timeFormat = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  // Format the date
  const dateString = dateFormat.format(date);
  const timeString = timeFormat.format(date);

  return `${dateString} @ ${timeString}`;
}

export function createPointsEmbed(
  des: string,
  footerText: string,
  status: 'Success' | 'Fail' = 'Success',
): EmbedBuilder {
  return new EmbedBuilder()
    .setDescription(des)
    .setColor(status === 'Success' ? 0x00ff00 : 0xff0000)
    .setFooter({
      text: footerText,
    });
}

export function isToday(dateString: string) {
  // Split the date string into day, month, and year components
  const [day, month, year] = dateString.split('-').map(Number);

  // Create a Date object from the components
  const inputDate = new Date(year, month - 1, day); // Month is 0-based in JS Date

  // Get today's date without time
  const today = new Date();
  today.setHours(0, 0, 0, 0);  

  // Compare the input date with today's date
  return inputDate.getTime() === today.getTime();
}
