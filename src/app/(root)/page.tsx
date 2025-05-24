import { Hero, CTASection } from "@/components/sections";
import { GoCheckCircle, GoHeart, GoRocket, GoShield } from "react-icons/go";
import { FeatureCard } from "@/components/ui/feature-card";
import { Separator } from "@/components/ui/separator";
import { Section } from "@/components/common";
import Stats from "@/components/ui/stats";
import Testimonials from "@/components/ui/testimonials";
import { Heading, Text } from "@/components/ui";

export default function Home() {
  const features = [
    {
      title: "Дэмжигчид эсвэл үйлчлүүлэгч биш",
      description:
        'Бид тэднийг "үйлчлүүлэгч" эсвэл гүйлгээ гэж нэрлэдэггүй. Тэд бол таны дэмжигчид.',
    },
    {
      title: "Захиалга, сарын төлбөр байхгүй",
      description: "Захиалга эсвэл сарын төлбөр байхгүй. Олсныгоо хадгалаарай.",
    },
    {
      title: "Энгийн, найрсаг интерфейс",
      description:
        "Та болон таны үзэгчдэд зориулсан энгийн, найрсаг интерфейс.",
    },
    {
      title: "Шууд данс руу төлбөр",
      description: "Төлбөрийг бага шимтгэлээр шууд таны данс руу хүлээн авах.",
    },
  ];

  const stats = [
    {
      label: "Бүтээлч",
      value: "1M+",
      description: "Дэлхий даяар",
      icon: <GoHeart className="h-6 w-6 text-yellow-500" />,
    },
    {
      label: "Кофе худалдан авсан",
      value: "50M+",
      description: "Нийт гүйлгээ",
      icon: <GoRocket className="h-6 w-6 text-yellow-500" />,
    },
    {
      label: "Орлого олсон",
      value: "$500M+",
      description: "Бүтээлчдэд",
      icon: <GoShield className="h-6 w-6 text-yellow-500" />,
    },
    {
      label: "Улс орон",
      value: "190+",
      description: "Дэлхий даяар",
      icon: <GoCheckCircle className="h-6 w-6 text-yellow-500" />,
    },
  ];

  const testimonials = [
    {
      name: "Болдбаатар",
      role: "YouTube Блоггер",
      content:
        "Энэ платформ миний үзэгчидтэй холбогдох арга замыг өөрчилсөн. Одоо тэд надад кофе худалдаж авч, дэмжлэг үзүүлж чадна.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Цэцэгмаа",
      role: "Зураач",
      content:
        "Миний урлагийн ажлыг дэмжигчид үнэхээр үнэлж байгааг мэдэх нь маш сайхан байна. Энэ нь миний урам зоригийг өгдөг.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b131?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Баттулга",
      role: "Подкастер",
      content:
        "Хүмүүс миний подкастыг сонсохоосоо гадна дэмжлэг үзүүлж чадаж байгаа нь гайхалтай. Энэ платформыг санал болгож байна!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
  ];

  return (
    <main className="flex-1">
      <Hero />

      {/* Stats Section */}
      <Section background="muted" padding="lg">
        <div className="text-center mb-8 sm:mb-12">
          <Heading variant="h3" className="mb-4">
            Дэлхийн хамгийн том дэмжлэгийн платформ
          </Heading>
        </div>
        <Stats stats={stats} variant="highlighted" />
      </Section>

      {/* Дэмжлэг хэсэг */}
      <Section>
        <div className="text-center max-w-5xl mx-auto">
          <Text variant="large" textColor="muted" className="mb-4 sm:mb-6">
            Дэмжлэг
          </Text>
          <Heading variant="h1" className="mb-6 sm:mb-8 leading-tight px-4">
            Таны үзэгчдэд талархал илэрхийлэх хялбар арга олгоорой.
          </Heading>
          <Text
            variant="large"
            textColor="muted"
            className="max-w-4xl mx-auto leading-relaxed px-4"
          >
            &quot;Кофе авч өгөөрэй&quot; нь дэмжлэг үзүүлэхийг хөгжилтэй, хялбар
            болгодог. Хэдхэн товшилтоор таны фэнүүд төлбөр хийж, мессеж үлдээх
            боломжтой.
          </Text>
        </div>
      </Section>

      <Separator className="my-8 sm:my-12" />

      {/* Бүтээлчдэд зориулсан хэсэг */}
      <Section>
        <div className="text-center mb-12 sm:mb-16">
          <Heading
            variant="h1"
            className="mb-6 sm:mb-8 max-w-5xl mx-auto leading-tight px-4"
          >
            Бизнесийн бус, бүтээлчдэд зориулан зохион бүтээгдсэн.
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={
                <GoCheckCircle className="text-2xl sm:text-3xl text-green-500" />
              }
              title={feature.title}
              description={feature.description}
              className="hover:scale-[1.02] transition-transform duration-200"
            />
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section background="muted" padding="lg">
        <div className="text-center mb-12 sm:mb-16">
          <Heading variant="h2" className="mb-4">
            Бүтээлчдийн хүссэн зүйл энэ байлаа
          </Heading>
          <Text variant="large" textColor="muted" className="max-w-3xl mx-auto">
            Дэлхийн өнцөг булан бүрээс бүтээлчид бидний платформыг ашиглан
            амжилтанд хүрч байна.
          </Text>{" "}
        </div>
        <Testimonials testimonials={testimonials} variant="featured" />
      </Section>

      {/* Call to Action Section */}
      <CTASection
        variant="gradient"
        title="Одоо эхлэх цаг болжээ!"
        description="Таны дэмжигчид таныг хүлээж байна. Хэдхэн товшилтоор өөрийн платформыг бүтээж, орлого олж эхлээрэй."
        primaryButtonText="Үнэгүй эхлэх"
        secondaryButtonText="Жишээ үзэх"
      />
    </main>
  );
}
