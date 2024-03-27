import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
},);

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    

    const body = await req.json();
    const { booking, paymentIntentID } = body;
    const userData = await db.user.findMany({where:{userID:user.id}})
    
   
    const bookingData = {
      
      userId: userData[0].id ||"",
      carId: booking.carId as string ||"",
      serviceType:booking.serviceType as string ||"",
      tripType: booking.tripType  as string ||"",
      startTime: booking.startTime  as string ||"",
      endTime: booking.endTime  as string ||"",
      pickUpLocation: booking.pickUpLocation  as string ||"",
      dropOutLocation: booking.dropOutLocation  as string ||"",
      rentalPackage:booking.rentalPackage  as string ||"",
      airportTaxi:booking.airportTaxi  as string ||"",
      distance: booking.distance  as number ||0,
      amount: booking.amount  as number ||0,
      currency: 'usd',
      paymentId: paymentIntentID as string ||"",
      status: "pending",
        // You can use other options like 'create' or 'connectOrCreate' as needed
    };

    let foundBooking:  any[] = [];

    if (paymentIntentID) {
      foundBooking = await db.booking.findMany({
        where: { paymentId: paymentIntentID, userId: user.id },
      });
    }

if (foundBooking?.length>0 && foundBooking[0].paymentId == paymentIntentID) {
  console.error("Booking Found in this Id");
      return NextResponse.json({ message: 'Booking Found in this Id' }, { status: 500 });
    } else {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: bookingData.amount * 100,
        description:'Car Rental Booking',
        currency: bookingData.currency,
        automatic_payment_methods: {
          enabled: true,
        },
        
      });
      if (!paymentIntent) {
        console.error("Payment intent creation failed.");
        return NextResponse.json('Internal Server Error', { status: 500 });
      }
      bookingData.paymentId = paymentIntent.id;
      

      const createdBooking = await db.booking.create({
        data: {
          ...bookingData,  
        },
      });
       console.log(paymentIntent)
      return NextResponse.json(paymentIntent);
    }
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
}
