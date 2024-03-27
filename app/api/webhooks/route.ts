import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import db from '@/lib/db'
 
export async function POST(req: Request) {
 
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
 
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
 
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
 
  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }
 
  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);
 
  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);
 
  let evt: WebhookEvent
 
  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }
 
  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;
  console.log('ID:', id, 'Type:', eventType);
  
  const { data } = payload;
      
  
  
    if (id && eventType === 'user.created') {
        try{
          const userData = {
            userID: data.id as string ,
            first_name: data.first_name as string ,  // Adjusted property name to match Prisma-generated type
            last_name: data.last_name as string || '',
            phone_number: data.phone_numbers[0]?.phone_number as string ||"",
            email: data.email_addresses[0]?.email_address as string,
            gender: data.gender as string || '',
            profile_image_url: data.profile_image_url as string,
            created_at: data.created_at ,
            updated_at: data.updated_at,
          }
          const user = await db.user.create({
            data: userData,
          }); 
          // Use userData object here
        console.log('user created', user);
        return new Response('', { status: 200 });
        }catch(error){
          console.error('Error creating user webhook/create:', error);
        }
      
        
      }

      if (id && eventType === 'user.updated') {
          
        const userData = {
          userID: data.id as string ,
          first_name: data.first_name as string ,  // Adjusted property name to match Prisma-generated type
          last_name: data.last_name as string || '',
          phone_number: data.phone_numbers[0]?.phone_number as string ||"",
          email: data.email_addresses[0]?.email_address as string,
          gender: data.gender as string || '',
          profile_image_url: data.profile_image_url as string,
          created_at: data.created_at ,
          updated_at: data.updated_at,
        }
        const user = await db.user.update({
            where: {
              userID: payload.data.id
            },
            data: userData,
        })
        
        
       
        console.log('user updated', user);
        return new Response('user Updated', { status: 200 });
      }

      if(id && eventType==='user.deleted'){

        const user = await db.user.delete({
            where: {
              userID:id
            }
        })
        console.log('user deleted',user)
        return new Response('', { status: 200 })
      }
      
    }


  


 


 