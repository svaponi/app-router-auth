/**
 * v0 by Vercel.
 * @see https://v0.dev/t/t7VsjwTi4Ld
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

import { useState, useMemo } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 99.99,
    image: '/placeholder.svg',
    category: 'Electronics',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Leather Backpack',
    description: 'Durable and stylish leather backpack',
    price: 79.99,
    image: '/placeholder.svg',
    category: 'Bags',
    rating: 4.2,
  },
  {
    id: 3,
    name: 'Outdoor Jacket',
    description: 'Waterproof and breathable outdoor jacket',
    price: 149.99,
    image: '/placeholder.svg',
    category: 'Clothing',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Fitness Tracker',
    description: 'Advanced fitness tracker with heart rate monitoring',
    price: 59.99,
    image: '/placeholder.svg',
    category: 'Electronics',
    rating: 4.3,
  },
  {
    id: 5,
    name: 'Leather Wallet',
    description: 'Minimalist leather wallet with RFID protection',
    price: 29.99,
    image: '/placeholder.svg',
    category: 'Accessories',
    rating: 4.6,
  },
  {
    id: 6,
    name: 'Camping Tent',
    description: 'Lightweight and durable camping tent',
    price: 199.99,
    image: '/placeholder.svg',
    category: 'Outdoor',
    rating: 4.8,
  },
];

interface State {
  category: string[];
  price: { min: number; max: number };
  rating: number;
}

export default function Component() {
  const [selectedFilters, setSelectedFilters] = useState<State>({
    category: [],
    price: { min: 0, max: 1000 },
    rating: 0,
  });
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        selectedFilters.category.length > 0 &&
        !selectedFilters.category.includes(product.category)
      ) {
        return false;
      }
      if (
        product.price < selectedFilters.price.min ||
        product.price > selectedFilters.price.max
      ) {
        return false;
      }
      if (product.rating < selectedFilters.rating) {
        return false;
      }
      return true;
    });
  }, [selectedFilters]);
  const handleFilterChange = (type: string, value: any) => {
    if (type === 'category') {
      setSelectedFilters({
        ...selectedFilters,
        category: selectedFilters.category.includes(value)
          ? selectedFilters.category.filter((item) => item !== value)
          : [...selectedFilters.category, value],
      });
    } else if (type === 'price') {
      setSelectedFilters({
        ...selectedFilters,
        price: value,
      });
    } else if (type === 'rating') {
      setSelectedFilters({
        ...selectedFilters,
        rating: value,
      });
    }
  };
  return (
    <div className="grid gap-8 p-4 md:grid-cols-[240px_1fr] md:p-8">
      <div className="flex flex-col gap-6 md:sticky md:top-0">
        <Accordion type="single" collapsible>
          <AccordionItem value="category">
            <AccordionTrigger className="text-base font-medium">
              Category
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={selectedFilters.category.includes('Electronics')}
                    onCheckedChange={() =>
                      handleFilterChange('category', 'Electronics')
                    }
                  />
                  Electronics
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={selectedFilters.category.includes('Bags')}
                    onCheckedChange={() =>
                      handleFilterChange('category', 'Bags')
                    }
                  />
                  Bags
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={selectedFilters.category.includes('Clothing')}
                    onCheckedChange={() =>
                      handleFilterChange('category', 'Clothing')
                    }
                  />
                  Clothing
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={selectedFilters.category.includes('Accessories')}
                    onCheckedChange={() =>
                      handleFilterChange('category', 'Accessories')
                    }
                  />
                  Accessories
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={selectedFilters.category.includes('Outdoor')}
                    onCheckedChange={() =>
                      handleFilterChange('category', 'Outdoor')
                    }
                  />
                  Outdoor
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="price">
            <AccordionTrigger className="text-base font-medium">
              Price Range
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4">
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={[selectedFilters.price.min, selectedFilters.price.max]}
                  onValueChange={(value) =>
                    handleFilterChange('price', {
                      min: value[0],
                      max: value[1],
                    })
                  }
                />
                <div className="text-muted-foreground flex justify-between text-sm">
                  <span>${selectedFilters.price.min}</span>
                  <span>${selectedFilters.price.max}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="rating">
            <AccordionTrigger className="text-base font-medium">
              Rating
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={selectedFilters.rating >= 4}
                    onCheckedChange={() => handleFilterChange('rating', 4)}
                  />
                  4 stars and above
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={selectedFilters.rating >= 3}
                    onCheckedChange={() => handleFilterChange('rating', 3)}
                  />
                  3 stars and above
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={selectedFilters.rating >= 2}
                    onCheckedChange={() => handleFilterChange('rating', 2)}
                  />
                  2 stars and above
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={selectedFilters.rating >= 1}
                    onCheckedChange={() => handleFilterChange('rating', 1)}
                  />
                  1 star and above
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-background flex flex-col overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src="/placeholder.svg"
                alt={product.name}
                width={400}
                height={400}
                className="h-48 w-full object-cover"
              />
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {product.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-primary font-medium">
                    ${product.price}
                  </span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-muted-foreground col-span-full text-center">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}
