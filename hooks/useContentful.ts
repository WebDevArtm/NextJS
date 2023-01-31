import {createClient, EntryFields, Asset, Entry} from 'contentful'


export type Author = {
  name: EntryFields.Text,
  avatar: Asset,
  email: EntryFields.Text
}

export type Posts = {
  name: Entry<Author>
  post: EntryFields.Text
}

export const useContextful = () => {

    const client = createClient({
        space: "agugyixdo8gg",
        accessToken: "HHcVdQGPBI9YNj2UpZ9ASMcLCWW4cjWq5WLOf28A6Es",
        host: "preview.contentful.com"
      }) 
      
      const getAuthors = async () =>  {
        try{
        const entries = await client.getEntries<Author>({
          content_type: 'author',
          select: 'fields'
        });  
        return entries

        }catch(e){
          console.log(e);
          
        }
      }

      const getPosts = async (name: string) => {
        try{
          const entries = await client.getEntries<Posts>({
            content_type: 'posts',
            select:'fields'
          })

          const posts = entries.items.filter(item => item.fields.name.fields.name === name)
          return posts
        }catch(e){
          console.log(e)
        }
      }
    return { getAuthors, getPosts }
}
