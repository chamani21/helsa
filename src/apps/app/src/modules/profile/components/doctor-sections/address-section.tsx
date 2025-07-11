'use client';

import { Button } from '@helsa/ui/components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useAddress } from '../../hooks/use-doctor';

const formSchema = z.object({
  consultingRoom: z.object({
    city: z.string().min(2, {
      message: 'First name must be at least 2 characters.',
    }),
    address: z.string().min(2, {
      message: 'Last name must be at least 2 characters.',
    }),
  }),
});

type AddressFormValues = z.infer<typeof formSchema>;

export const AddressSection = ({ consultingRoom, id }: AddressFormValues & { id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { consultingRoom },
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const { saveConsultingRoomAddress } = useAddress(id);

  const onSubmit = async (data: AddressFormValues) => {
    try {
      await saveConsultingRoomAddress(data.consultingRoom);
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('Error updating consulting room');
    }
  };

  return (
    <Card className="rounded-none bg-transparent">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <CardHeader>
            <div>
              <CardTitle>Ubicación de consultorio</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Esta es la ubicación de tu consultorio. Los pacientes podrán ver esta información en tu perfil.
              </p>
              {!isEditing ? (
                <div className="space-y-2 mt-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4"></MapPin>
                    <p>
                      {consultingRoom.city}, {consultingRoom.address}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center gap-3 mt-3">
                  <FormField
                    control={form.control}
                    name="consultingRoom.city"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <div>
                            <Input {...field} className="outline-none rounded-none"></Input>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="consultingRoom.address"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                          <div>
                            <Input {...field} className="outline-none rounded-none"></Input>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          </CardHeader>
          <CardFooter className="border-t pt-4 flex justify-between items-start gap-2 md:items-center flex-col md:flex-row">
            <p className="text-muted-foreground text-xs">
              {isEditing ? 'Este número es público.' : 'Este número es público.'}
            </p>
            {isEditing ? (
              <div className="flex justify-end items-center gap-3">
                <Button
                  onClick={() => {
                    form.reset();
                    toggleEdit();
                  }}
                  className="rounded-none"
                >
                  Cancelar
                </Button>
                <Button disabled={!isValid || isSubmitting} type="submit" className="rounded-none">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
                </Button>
              </div>
            ) : (
              <Button onClick={toggleEdit} className="rounded-none">
                Editar
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
