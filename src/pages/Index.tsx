import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface Tariff {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tariffs: Tariff[] = [
    {
      id: '1',
      name: 'Базовый',
      price: 0,
      description: 'Для первых шагов в цифровом банкинге',
      features: ['Бесплатное обслуживание', 'Снятие до 50 000 ₽', 'Cashback 1%'],
    },
    {
      id: '2',
      name: 'Стандарт',
      price: 299,
      description: 'Оптимальное решение для повседневных операций',
      features: ['Снятие до 150 000 ₽', 'Cashback 3%', 'Бесплатные переводы', 'SMS-уведомления'],
      isPopular: true,
    },
    {
      id: '3',
      name: 'Премиум',
      price: 999,
      description: 'Максимум возможностей для активных пользователей',
      features: ['Неограниченное снятие', 'Cashback 5%', 'Консьерж-сервис', 'Страхование поездок'],
    },
    {
      id: '4',
      name: 'Бизнес',
      price: 1499,
      description: 'Для предпринимателей и бизнеса',
      features: ['Бухгалтерия', 'Корпоративные лимиты', 'Приоритетная поддержка', 'API интеграция'],
    },
  ];

  const filteredTariffs = tariffs.filter((tariff) =>
    tariff.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-[#333333]">Тарифы по картам</h1>
              <p className="text-sm text-[#666666] mt-1">Управление тарифными планами</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#269349] hover:bg-[#1f7a3a] text-white rounded-lg h-10">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать тариф
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-lg">
                <DialogHeader>
                  <DialogTitle>Создание нового тарифа</DialogTitle>
                  <DialogDescription>
                    Заполните информацию о новом тарифном плане
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Название тарифа</Label>
                    <Input id="name" placeholder="Введите название" className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Стоимость (₽/месяц)</Label>
                    <Input id="price" type="number" placeholder="0" className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Описание</Label>
                    <Input id="description" placeholder="Краткое описание" className="rounded-lg" />
                  </div>
                  <Button className="w-full bg-[#269349] hover:bg-[#1f7a3a] text-white rounded-lg">
                    Создать
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex gap-3">
            <div className="relative flex-1">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
              <Input
                placeholder="Поиск по названию тарифа"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-lg bg-white border-[#E5E5E5]"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-lg border-[#E5E5E5]"
            >
              <Icon name="Filter" size={18} className="mr-2" />
              Фильтр
            </Button>
          </div>

          {showFilters && (
            <Card className="rounded-lg animate-in slide-in-from-top-2 duration-200">
              <CardContent className="pt-6">
                <div className="flex gap-2">
                  <Button
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('all')}
                    className={selectedCategory === 'all' ? 'bg-[#269349] hover:bg-[#1f7a3a] rounded-lg' : 'rounded-lg'}
                  >
                    Все
                  </Button>
                  <Button
                    variant={selectedCategory === 'personal' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('personal')}
                    className={selectedCategory === 'personal' ? 'bg-[#269349] hover:bg-[#1f7a3a] rounded-lg' : 'rounded-lg'}
                  >
                    Личные
                  </Button>
                  <Button
                    variant={selectedCategory === 'business' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('business')}
                    className={selectedCategory === 'business' ? 'bg-[#269349] hover:bg-[#1f7a3a] rounded-lg' : 'rounded-lg'}
                  >
                    Бизнес
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTariffs.map((tariff) => (
            <Card key={tariff.id} className="rounded-lg hover:shadow-lg transition-shadow duration-200 relative overflow-hidden">
              {tariff.isPopular && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-[#269349] text-white rounded-bl-lg rounded-tr-lg border-0">
                    Популярный
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl text-[#333333]">{tariff.name}</CardTitle>
                    <CardDescription className="text-sm">{tariff.description}</CardDescription>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-semibold text-[#333333]">{tariff.price}</span>
                    <span className="text-sm text-[#666666]">₽/мес</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  {tariff.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-[#269349] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#333333]">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full rounded-lg border-[#269349] text-[#269349] hover:bg-[#269349] hover:text-white"
                >
                  Подробнее
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTariffs.length === 0 && (
          <Card className="rounded-lg">
            <CardContent className="py-16 text-center">
              <Icon name="SearchX" size={48} className="mx-auto text-[#999999] mb-4" />
              <p className="text-[#666666]">Тарифы не найдены</p>
              <p className="text-sm text-[#999999] mt-1">Попробуйте изменить поисковый запрос</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
