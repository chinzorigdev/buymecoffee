import React from "react";
import { Container, Section } from "@/components/common";
import { Heading, Text } from "@/components/ui";

export default function TermsPage() {
  return (
    <Section padding="lg">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heading variant="h1" className="mb-4">
              Үйлчилгээний нөхцөл
            </Heading>
            <Text variant="large" textColor="muted">
              Эдгээр нөхцөлүүд таны БүйМиКофи платформын ашиглалтыг зохицуулна
            </Text>
          </div>

          <div className="space-y-8">
            <section>
              <Heading variant="h3" className="mb-4">
                1. Үйлчилгээний тухай
              </Heading>
              <Text className="mb-4">
                БүйМиКофи нь бүтээлчдэд дэмжлэг үзүүлэх платформ юм. Энэ нь таны
                дэмжигчдэд таныг дэмжих боломжийг олгодог.
              </Text>
            </section>

            <section>
              <Heading variant="h3" className="mb-4">
                2. Хэрэглэгчийн үүрэг хариуцлага
              </Heading>
              <Text className="mb-4">
                Та өөрийн бүртгэлийн мэдээллийн үнэн зөв байдлыг хариуцна.
                Бусдын эрхийг хүндэтгэж, платформыг зохистой ашиглана.
              </Text>
            </section>

            <section>
              <Heading variant="h3" className="mb-4">
                3. Төлбөр, шимтгэл
              </Heading>
              <Text className="mb-4">
                Платформ дээрх гүйлгээнээс тодорхой хувийн шимтгэл авна. Энэ нь
                платформын хөгжүүлэлт, засвар үйлчилгээнд зарцуулагдана.
              </Text>
            </section>

            <section>
              <Heading variant="h3" className="mb-4">
                4. Хууль ёсны зүйл
              </Heading>
              <Text className="mb-4">
                Энэхүү гэрээ нь Монгол Улсын хуульд захирагдана. Маргаан үүссэн
                тохиолдолд Монгол Улсын шүүхэд шийдвэрлүүлнэ.
              </Text>
            </section>

            <section>
              <Heading variant="h3" className="mb-4">
                5. Өөрчлөлт
              </Heading>
              <Text className="mb-4">
                Бид эдгээр нөхцлийг цаг тухайд нь шинэчлэх эрхтэй. Томоохон
                өөрчлөлтийн талаар урьдчилан мэдэгдэх болно.
              </Text>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t">
            <Text textColor="muted" className="text-center">
              Эдгээр нөхцөл нь {new Date().getFullYear()} оны{" "}
              {new Date().getMonth() + 1} сарын {new Date().getDate()}-ний
              өдрөөс хүчинтэй.
            </Text>
          </div>
        </div>
      </Container>
    </Section>
  );
}
