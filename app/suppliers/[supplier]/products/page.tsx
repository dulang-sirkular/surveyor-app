import SupplierProducts from './supplier-products';

export function generateStaticParams() {
  return [
    { supplier: 'grab' },
    { supplier: 'blibli' },
    { supplier: 'modena' },
    { supplier: 'daikin' }
  ];
}

export default function SupplierProductsPage() {
  return <SupplierProducts />;
}