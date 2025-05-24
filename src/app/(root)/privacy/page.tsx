import React from "react";
import { Container, Section } from "@/components/common";
import { Heading, Text } from "@/components/ui";

export default function PrivacyPage() {
  return (
    <Section padding="lg">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heading variant="h1" className="mb-4">
              Нууцлалын бодлого
            </Heading>
            <Text variant="large" textColor="muted">
              Бид таны хувийн мэдээллийг хэрхэн цуглуулж, ашиглаж байгааг энд
              тайлбарласан
            </Text>
          </div>

          <div className="space-y-8">
            <section>
              <Heading variant="h3" className="mb-4">
                1. Цуглуулдаг мэдээлэл
              </Heading>
              <Text className="mb-4">
                Бид таны нэр, имэйл хаяг, төлбөрийн мэдээлэл зэрэг үйлчилгээ
                үзүүлэхэд шаардлагатай мэдээллийг цуглуулдаг.
              </Text>
            </section>

            <section>
              <Heading variant="h3" className="mb-4">
                2. Мэдээллийн ашиглалт
              </Heading>
              <Text className="mb-4">
                Таны мэдээллийг зөвхөн үйлчилгээ үзүүлэх, дансны удирдлага,
                харилцаа холбоо хийх зорилгоор ашигладаг.
              </Text>
            </section>

            <section>
              <Heading variant="h3" className="mb-4">
                3. Мэдээллийн хуваалцах
              </Heading>
              <Text className="mb-4">
                Бид таны хувийн мэдээллийг гуравдагч талтай хуваалцдаггүй.
                Зөвхөн хуулийн шаардлагаар тодорхой тохиолдолд л хуваалцана.
              </Text>
            </section>

            <section>
              <Heading variant="h3" className="mb-4">
                4. Мэдээллийн хамгаалалт
              </Heading>
              <Text className="mb-4">
                Бид таны мэдээллийг хамгаалахын тулд орчин үеийн аюулгүй байдлын
                арга хэмжээг ашигладаг.
              </Text>
            </section>

            <section>
              <Heading variant="h3" className="mb-4">
                5. Cookie-нууд
              </Heading>
              <Text className="mb-4">
                Бид танд илүү сайн туршлага өгөхийн тулд cookie-нууд ашигладаг.
                Та үүнийг хөтчийнхөө тохиргооноос удирдаж болно.
              </Text>
            </section>

            <section>
              <Heading variant="h3" className="mb-4">
                6. Таны эрх
              </Heading>
              <Text className="mb-4">
                Та өөрийн мэдээллийг үзэх, засах, устгах эрхтэй. Энэ талаар
                бидэнтэй холбоо барина уу.
              </Text>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t">
            <Text textColor="muted" className="text-center">
              Энэхүү бодлого нь {new Date().getFullYear()} оны{" "}
              {new Date().getMonth() + 1} сарын {new Date().getDate()}-ний
              өдрөөс хүчинтэй.
            </Text>
          </div>
        </div>
      </Container>
    </Section>
  );
}
