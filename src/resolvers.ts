import fetch from "node-fetch";

const Resolvers = {
  Query: {
    records: async (_: any, args: any) => {
      const rawMentions = args.message.match(/@\w+/g);

      // remove @ from mentions
      const mentions = rawMentions
        ? rawMentions.map((mention: string) => mention.slice(1))
        : [];

      // emoticons are alphanumeric characters between parenthesis not longer than 15 characters in length inside parenthesis
      const emoticonsRaw = args.message.match(/\((\w{1,15})\)/g);

      // remove parenthesis from emoticons
      const emoticons = emoticonsRaw
        ? emoticonsRaw.map((emoticon: string) => emoticon.slice(1, -1))
        : [];

      // all urls/links with http or https protocol or without protocol with www
      const linksRaw = args.message.match(
        /((https?:\/\/)|(www\.))[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/g
      );

      //get the title of the link
      const getTitles = async (links: string[]): Promise<any> => {
        return Promise.all(
          links.map(async (link: string) => {
            const response = await fetch(link);
            const text = await response.text();

            const title = text.match(/<title>(.*?)<\/title>/);

            // remove <title> and </title> from title
            const titleText = title ? title[0].slice(7, -8) : "";
            return title
              ? { title: titleText, url: link }
              : { title: link, url: link };
          })
        );
      };

      const links = await getTitles(linksRaw);

      return {
        mentions,
        emoticons,
        links,
      };
    },
  },
};
export default Resolvers;
