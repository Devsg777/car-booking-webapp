"use client";
import { Car, Driver } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/app/utils/uploadthing";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Loader2, PencilLine, Trash, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import   { useRouter }  from "next/navigation";


interface CarWithDriver {
   car:Car
  }


interface AddCarFormProps {
  car: Car | null;
 
}

  

const formSchema = z.object({
  model: z
    .string()
    .min(2, { message: "Model must be atleast 2 character long" }),
  name: z.string().min(3, { message: "Name must be atleast 3 character long" }),
  description: z
    .string()
    .min(4, { message: "Description must be atleast 4 character long" }),
  price: z.string().min(1,{message:'Price is required'}),
  seats: z.string().min(1, { message: "Seat is required" }),
  image: z.string().min(1, { message: "Image is required" }),
  driverId: z.string().optional(),
});

const AddCarForm =({ car }: AddCarFormProps) => {

    const router = useRouter()
  const [tempImage, setTempImage] = useState<string | undefined>(car?.image);
  const [imageIsDeleting, setImageIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCarDeleting,setIsCarDeleting] = useState(false);
const [drivers, setDrivers] = useState<Driver[] | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: car
    ? { // Add the 'id' property here
        model: car.model,
        name: car.name,
        description: car.description,
        seats: car.seats,
        image: car.image,
        price: car.price,
        driverId: car.driverId || undefined, // Convert 'null' to 'undefined'
      }
    : {
        model: "",
        name: "",
        description: "",
        seats: "",
        image: "",
        price: '',
        driverId: undefined, // Set driverId to 'undefined'
      },
});
  
  

  useEffect(() => {
    if (typeof tempImage === "string") {
      form.setValue("image", tempImage, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [tempImage]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if(car){
      axios.patch(`/api/cars/${car.id}`,values).then((res)=>{
        toast({
            variant:'default',
            description:"🎉 Car Updated successfully "
        })
        router.push(`/dashboard/cars`)
        router.refresh()
    }).catch((err)=>{
        console.log(err)
        toast({
            variant:'danger',
            description:"Something went Wrong"
        })
        setIsLoading(false);
    })
         
    }else{
        axios.post('/api/cars',values).then((res)=>{
            toast({
                variant:'success',
                description:"🎉 Car Added successfully "
            })
            router.push(`/dashboard/cars`)
            router.refresh()
        }).catch((err)=>{
            console.log(err)
            toast({
                variant:'danger',
                description:"Something went Wrong"
            })
            setIsLoading(false);
        })
    }
  }

  const handleDeleteDriver = async(car:Car)=>{
    setIsCarDeleting(true);
    const getImageKey = (src:string)=>src.substring(src.lastIndexOf(('/') +1))

    try{
        const imageKey = getImageKey(car.image);
        await axios.post('/api/uploadthing/delete',{ fileKeys: [imageKey] })
        await axios.delete(`/api/cars/${car.id}`)
        setImageIsDeleting(false);
        toast({
            variant:'success',
            description:"🎉 Car Deleted "

        })
        router.push('/dashboard/cars')
        router.refresh()
    }catch(error:any){
        console.log(error);
        setIsCarDeleting(false);
        toast({
            variant:'destructive',
            description:`Car deletion could not be completed ${error.message}`
        })

    }

}

  function handlerImageDelete(image: string | undefined) {
    if (!image) {
      console.error("Invalid image type: undefined");
      // Handle the error accordingly, for example, show a message to the user.
      return;
    }
    setImageIsDeleting(true);

    const imagKey = image.substring(image.lastIndexOf("/") * 1);
    axios
      .post("/api/uploadthing/delete", { fileKeys: [imagKey] })
      .then((res) => {
        if (res.data.success) {
          setTempImage("");
          toast({
            variant: "success",
            description: "Image removed",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Something went wrong",
        });
      })
      .finally(() => {
        setImageIsDeleting(false);
      });
  }
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/drivers');
         setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function inside useEffect

    // If you need cleanup logic, return a cleanup function from useEffect
    return () => {
      // Cleanup logic, if needed
    };
  },[form] );
  
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-6 gap-5 ">
            <div className="grid col-span-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car Name</FormLabel>
                    <FormDescription>Provide Your Car Name</FormDescription>
                    <FormControl>
                      <Input placeholder="Tigor " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid col-span-3">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car Model</FormLabel>
                    <FormDescription>Provide Your Car Model</FormDescription>
                    <FormControl>
                      <Input placeholder="Sedon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid col-span-3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price </FormLabel>
                    <FormDescription>Provide Your Car Price per Km/Hr</FormDescription>
                    <FormControl>
                      <Input placeholder="24 Rs/Km" {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Primium Safari" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" col-span-2">
              <FormField
                control={form.control}
                name="seats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No of Seats</FormLabel>
                    <FormControl>
                      <Input placeholder="3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" col-span-2">
              {/* <FormField
                            control={form.control}
                            name="driverId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select a Driver</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Primium Safari" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
              <FormField
                control={form.control}
                name="driverId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select a Driver</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Your Drivers" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {drivers && (drivers.map((driver) => {
                          return (
                            <SelectItem key={driver.id} value={driver.id}>
                              {driver.name}
                            </SelectItem>
                          );
                        }))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Pick a Driver for Your Car.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload a image of your Car</FormLabel>
                <FormControl>
                  {tempImage ? (
                    <>
                      <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4">
                        <Image
                          fill
                          src={tempImage}
                          alt="car Image"
                          className="object-contain"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className=" absolute -right-12 top-0"
                          onClick={() => {
                            handlerImageDelete(tempImage);
                          }}
                        >
                          {imageIsDeleting ? <Loader2 /> : <XCircle />}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="flex flex-col items-center max-w-[4000px] p-12 border-2 border-dashed border-primary/50 rounded mt-4">
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            // Do something with the response
                            console.log("Files: ", res);
                            setTempImage(res[0].url);
                            toast({
                              variant: "success",
                              description: "🎉 Upload successfull.",
                            });
                          }}
                          onUploadError={(error: Error) => {
                            // Do something with the error.
                            toast({
                              variant: "danger",
                              description: `ERROR! ${error.message}`,
                            });
                          }}
                        />
                      </div>
                    </>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4 flex-wrap items-center ">
          {car && <Button onClick={()=>{handleDeleteDriver(car)}} variant='ghost' type="button" className="max-w-[150px]" disabled={isCarDeleting || isLoading}>
                {isCarDeleting?<><Loader2 className="mr-2  h-4 w-4"/></>:
                <><Trash className="mr-2  h-4 w-4" />Delete </>}
                </Button>}
            {car ? (
              <Button
                type="submit"
                className=" bg-emerald-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2  h-4 w-4 " />
                    Updating
                  </>
                ) : (
                  <>
                    <PencilLine className="mr-w h-4 w-4 " />
                    Update
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="submit"
                className=" bg-emerald-500 max-w-[150px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2  h-4 w-4 " />
                    Adding
                  </>
                ) : (
                  <>
                    <PencilLine className="mr-2 h-4 w-4 " />
                    Add a Car
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddCarForm;
