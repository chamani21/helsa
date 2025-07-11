import { Tabs, TabsContent, TabsList, TabsTrigger } from '@helsa/ui/components/tabs';
import AppointmentHistory from './appointment-history';
import Diagnoses from './diagnoses';
import Notes from './notes';
import PatientOverview from './overview';
import Tests from './tests';
import Treatments from './treatments';

const PatientDetailsTabs = () => {
  return (
    <Tabs defaultValue="overview" className="w-full my-4">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 bg-background border">
        <TabsTrigger value="overview" className="gap-2  data-[state=active]:bg-violet-500 cursor-pointer">
          Resumen
        </TabsTrigger>
        <TabsTrigger value="appointments" className="gap-2  data-[state=active]:bg-violet-500 cursor-pointer">
          Citas
        </TabsTrigger>
        <TabsTrigger value="diagnoses" className="gap-2  data-[state=active]:bg-violet-500 cursor-pointer">
          Diagnósticos
        </TabsTrigger>
        <TabsTrigger value="medications" className="gap-2  data-[state=active]:bg-violet-500 cursor-pointer">
          Medicación
        </TabsTrigger>
        <TabsTrigger value="observations" className="gap-2  data-[state=active]:bg-violet-500 cursor-pointer">
          Observaciones
        </TabsTrigger>
        <TabsTrigger value="results" className="gap-2  data-[state=active]:bg-violet-500 cursor-pointer">
          Resultados
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4 py-4">
        <PatientOverview />
      </TabsContent>
      <TabsContent value="appointments" className="space-y-4 py-4">
        <AppointmentHistory />
      </TabsContent>
      <TabsContent value="diagnoses" className="space-y-4 py-4">
        <Diagnoses />
      </TabsContent>
      <TabsContent value="medications" className="space-y-4 py-4">
        <Treatments />
      </TabsContent>
      <TabsContent value="observations" className="space-y-4 py-4">
        <Notes />
      </TabsContent>
      <TabsContent value="results" className="space-y-4 py-4">
        <Tests />
      </TabsContent>
    </Tabs>
  );
};

export default PatientDetailsTabs;
