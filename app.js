// React component for Platinum Signs Quote Builder
const root = ReactDOM.createRoot(document.getElementById('root'));

// The component starts here

import React, { useState, useEffect } from 'react';

const PlatinumSignsQuoteBuilder = () => {
  // State for the current item being configured
  const [currentItem, setCurrentItem] = useState({
    id: 1,
    signType: '',
    material: '',
    width: '',
    height: '',
    quantity: 1,
    doubleSided: false,
    installation: false,
    rush: false,
    lamination: false,
    hardware: 'None',
    finishingOption: 'None',
    notes: '',
    price: 0
  });
  
  // State for the complete quote
  const [quoteItems, setQuoteItems] = useState([]);
  const [quoteNumber, setQuoteNumber] = useState(`PS-${new Date().getFullYear().toString().slice(2)}-${Math.floor(1000 + Math.random() * 9000)}`);
  
  // Customer information state
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerPostal, setCustomerPostal] = useState('');
  
  const [quoteNotes, setQuoteNotes] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  
  // Tax configuration
  const [gstRate, setGstRate] = useState(5);
  const [pstRate, setPstRate] = useState(7);
  const [applyGST, setApplyGST] = useState(true);
  const [applyPST, setApplyPST] = useState(true);
  
  // Customer database
  const [customers, setCustomers] = useState([]);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);
  
  // Initialize with some sample customers (in real app would load from database)
  useEffect(() => {
    const sampleCustomers = [
      { id: 1, name: 'Acme Corporation', email: 'contact@acmecorp.com', phone: '(555) 123-4567', address: '123 Main St', city: 'Business City', postal: 'A1B 2C3' },
      { id: 2, name: 'City Hall', email: 'info@cityhall.gov', phone: '(555) 987-6543', address: '100 Government Rd', city: 'Metro City', postal: 'X9Y 8Z7' },
      { id: 3, name: 'Local Restaurant', email: 'owner@localfood.com', phone: '(555) 456-7890', address: '42 Food Ave', city: 'Flavor Town', postal: 'E4F 5G6' }
    ];
    
    // Check if we already have stored customers in localStorage
    const storedCustomers = localStorage.getItem('platinumSignsCustomers');
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    } else {
      setCustomers(sampleCustomers);
      localStorage.setItem('platinumSignsCustomers', JSON.stringify(sampleCustomers));
    }
  }, []);
  
  // Expanded sign types and materials
  const signTypes = [
    { id: 'vehicleDecal', name: 'Vehicle Decal/Wrap' },
    { id: 'coroplastSign', name: 'Coroplast Sign' },
    { id: 'exteriorLightbox', name: 'Exterior Lightbox' },
    { id: 'acrylicSignage', name: 'Acrylic Signage' },
    { id: 'banners', name: 'Banners' },
    { id: 'windowGraphics', name: 'Window Graphics' },
    { id: 'aluminumSigns', name: 'Aluminum Signs' },
    { id: 'magnets', name: 'Vehicle Magnets' },
    { id: 'foamCoreSigns', name: 'Foam Core Signs' },
    { id: 'dibondSigns', name: 'Dibond Signs' },
    { id: 'woodSigns', name: 'Wood Signs' },
    { id: 'pvcSigns', name: 'PVC Signs' },
    { id: 'metalLetters', name: 'Metal Letters' },
    { id: 'channelLetters', name: 'Channel Letters' },
    { id: 'awningSigns', name: 'Awning Signs' },
    { id: 'neonSigns', name: 'Neon / LED Signs' }
  ];

  // Materials options based on sign type
  const materialOptions = {
    vehicleDecal: [
      { id: 'standardVinyl', name: 'Standard Vinyl', pricePerSqFt: 8 },
      { id: 'premiumVinyl', name: 'Premium Vinyl', pricePerSqFt: 12 },
      { id: 'reflectiveVinyl', name: 'Reflective Vinyl', pricePerSqFt: 18 },
      { id: 'perforatedVinyl', name: 'Perforated Vinyl', pricePerSqFt: 15 },
      { id: 'carbonFiber', name: 'Carbon Fiber Vinyl', pricePerSqFt: 22 },
      { id: 'fullWrap', name: 'Full Vehicle Wrap Vinyl', pricePerSqFt: 25 }
    ],
    coroplastSign: [
      { id: '3mmCoroplast', name: '3mm Coroplast', pricePerSqFt: 6 },
      { id: '4mmCoroplast', name: '4mm Coroplast', pricePerSqFt: 8 },
      { id: '5mmCoroplast', name: '5mm Coroplast', pricePerSqFt: 10 },
      { id: 'foldableCoroplast', name: 'Foldable Coroplast', pricePerSqFt: 12 }
    ],
    exteriorLightbox: [
      { id: 'acrylicFace', name: 'Acrylic Face', pricePerSqFt: 55 },
      { id: 'polycarbonateFace', name: 'Polycarbonate Face', pricePerSqFt: 50 },
      { id: 'aluminumCabinet', name: 'Aluminum Cabinet', pricePerSqFt: 65 },
      { id: 'flexFace', name: 'Flex Face', pricePerSqFt: 60 },
      { id: 'edgeLit', name: 'Edge Lit Acrylic', pricePerSqFt: 75 }
    ],
    acrylicSignage: [
      { id: 'clearAcrylic', name: 'Clear Acrylic', pricePerSqFt: 25 },
      { id: 'coloredAcrylic', name: 'Colored Acrylic', pricePerSqFt: 30 },
      { id: 'frostedAcrylic', name: 'Frosted Acrylic', pricePerSqFt: 35 },
      { id: 'castAcrylic', name: 'Cast Acrylic', pricePerSqFt: 40 },
      { id: 'acrylicStandoffs', name: 'Acrylic with Standoffs', pricePerSqFt: 45 }
    ],
    banners: [
      { id: '13ozVinyl', name: '13oz Vinyl', pricePerSqFt: 6 },
      { id: '15ozVinyl', name: '15oz Vinyl', pricePerSqFt: 8 },
      { id: '18ozVinyl', name: '18oz Vinyl', pricePerSqFt: 10 },
      { id: 'meshVinyl', name: 'Mesh Vinyl', pricePerSqFt: 12 },
      { id: 'doubleStitched', name: 'Double Stitched 18oz', pricePerSqFt: 13 }
    ],
    windowGraphics: [
      { id: 'clearVinyl', name: 'Clear Vinyl', pricePerSqFt: 10 },
      { id: 'whiteVinyl', name: 'White Vinyl', pricePerSqFt: 10 },
      { id: 'perforatedVinyl', name: 'Perforated Vinyl', pricePerSqFt: 15 },
      { id: 'frostedVinyl', name: 'Frosted Vinyl', pricePerSqFt: 18 },
      { id: 'oneWayVision', name: 'One Way Vision', pricePerSqFt: 16 }
    ],
    aluminumSigns: [
      { id: '0.040Aluminum', name: '0.040 Aluminum', pricePerSqFt: 18 },
      { id: '0.080Aluminum', name: '0.080 Aluminum', pricePerSqFt: 22 },
      { id: '0.125Aluminum', name: '0.125 Aluminum', pricePerSqFt: 28 },
      { id: 'reflectiveAluminum', name: 'Reflective Aluminum', pricePerSqFt: 32 }
    ],
    magnets: [
      { id: '30mil', name: '30mil Vehicle Magnet', pricePerSqFt: 12 },
      { id: '35mil', name: '35mil Vehicle Magnet', pricePerSqFt: 15 },
      { id: '45mil', name: '45mil Vehicle Magnet', pricePerSqFt: 18 }
    ],
    foamCoreSigns: [
      { id: '3mmFoamCore', name: '3mm Foam Core', pricePerSqFt: 5 },
      { id: '5mmFoamCore', name: '5mm Foam Core', pricePerSqFt: 7 },
      { id: '10mmFoamCore', name: '10mm Foam Core', pricePerSqFt: 10 },
      { id: 'gatorBoard', name: 'Gator Board', pricePerSqFt: 15 }
    ],
    dibondSigns: [
      { id: '2mmDibond', name: '2mm Dibond/ACM', pricePerSqFt: 20 },
      { id: '3mmDibond', name: '3mm Dibond/ACM', pricePerSqFt: 25 },
      { id: '4mmDibond', name: '4mm Dibond/ACM', pricePerSqFt: 30 },
      { id: 'brushedDibond', name: 'Brushed Dibond/ACM', pricePerSqFt: 35 }
    ],
    woodSigns: [
      { id: 'mdf', name: 'MDF', pricePerSqFt: 14 },
      { id: 'plywood', name: 'Plywood', pricePerSqFt: 16 },
      { id: 'cedar', name: 'Cedar', pricePerSqFt: 22 },
      { id: 'redwood', name: 'Redwood', pricePerSqFt: 26 },
      { id: 'hdoPlywood', name: 'HDO Plywood', pricePerSqFt: 20 }
    ],
    pvcSigns: [
      { id: '3mmPVC', name: '3mm PVC', pricePerSqFt: 12 },
      { id: '6mmPVC', name: '6mm PVC', pricePerSqFt: 16 },
      { id: '12mmPVC', name: '12mm PVC', pricePerSqFt: 22 },
      { id: '19mmPVC', name: '19mm PVC', pricePerSqFt: 28 }
    ],
    metalLetters: [
      { id: 'aluminum', name: 'Aluminum Letters', pricePerSqFt: 95 },
      { id: 'brushedStainless', name: 'Brushed Stainless', pricePerSqFt: 110 },
      { id: 'bronze', name: 'Bronze Letters', pricePerSqFt: 125 },
      { id: 'brass', name: 'Brass Letters', pricePerSqFt: 120 }
    ],
    channelLetters: [
      { id: 'frontLit', name: 'Front-Lit Channel Letters', pricePerSqFt: 125 },
      { id: 'backLit', name: 'Back-Lit Channel Letters', pricePerSqFt: 135 },
      { id: 'openFace', name: 'Open Face Channel Letters', pricePerSqFt: 115 },
      { id: 'neonFilled', name: 'Neon-Filled Channel Letters', pricePerSqFt: 150 }
    ],
    awningSigns: [
      { id: 'vinyl', name: 'Vinyl Awning', pricePerSqFt: 35 },
      { id: 'canvas', name: 'Canvas Awning', pricePerSqFt: 45 },
      { id: 'illuminated', name: 'Illuminated Awning', pricePerSqFt: 65 }
    ],
    neonSigns: [
      { id: 'ledNeon', name: 'LED Neon Flex', pricePerSqFt: 85 },
      { id: 'glassNeon', name: 'Glass Neon', pricePerSqFt: 120 },
      { id: 'openNeon', name: 'Open Sign (Standard)', pricePerSqFt: 55 },
      { id: 'customNeon', name: 'Custom Neon Design', pricePerSqFt: 150 }
    ]
  };

  // Additional options
  const hardwareOptions = [
    { id: 'None', name: 'None', price: 0 },
    { id: 'grommets', name: 'Grommets', price: 1.5 },
    { id: 'standoffs', name: 'Standoffs', price: 5 },
    { id: 'stakes', name: 'Stakes', price: 3 },
    { id: 'frames', name: 'Frames', price: 12 },
    { id: 'poles', name: 'Poles/Posts', price: 20 },
    { id: 'hanging', name: 'Hanging System', price: 15 }
  ];

  const finishingOptions = [
    { id: 'None', name: 'None', price: 0 },
    { id: 'hems', name: 'Hems', price: 1 },
    { id: 'trimming', name: 'Custom Trimming', price: 2 },
    { id: 'rounding', name: 'Rounded Corners', price: 3 },
    { id: 'folding', name: 'Folding/Creasing', price: 2.5 },
    { id: 'mounting', name: 'Mounting Tape', price: 1.5 },
    { id: 'laminate', name: 'Lamination', price: 4 }
  ];

  // Modifiers
  const modifiers = {
    doubleSided: 1.8,
    installation: 1.5,
    rush: 1.3,
    lamination: 1.25
  };

  // Select a customer from the database
  const selectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setCustomerName(customer.name);
    setCustomerEmail(customer.email);
    setCustomerPhone(customer.phone);
    setCustomerAddress(customer.address);
    setCustomerCity(customer.city);
    setCustomerPostal(customer.postal);
    setShowCustomerModal(false);
  };
  
  // Save the current customer to the database
  const saveCustomer = () => {
    if (!customerName) {
      alert('Customer name is required');
      return;
    }
    
    const newCustomer = {
      id: Date.now(),
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      address: customerAddress,
      city: customerCity,
      postal: customerPostal
    };
    
    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);
    setSelectedCustomer(newCustomer);
    
    // Save to localStorage
    localStorage.setItem('platinumSignsCustomers', JSON.stringify(updatedCustomers));
    
    setShowAddCustomerForm(false);
    alert('Customer added successfully');
  };
  
  // Update existing customer
  const updateCustomer = () => {
    if (!selectedCustomer) return;
    
    const updatedCustomer = {
      ...selectedCustomer,
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      address: customerAddress,
      city: customerCity,
      postal: customerPostal
    };
    
    const updatedCustomers = customers.map(c => 
      c.id === selectedCustomer.id ? updatedCustomer : c
    );
    
    setCustomers(updatedCustomers);
    setSelectedCustomer(updatedCustomer);
    
    // Save to localStorage
    localStorage.setItem('platinumSignsCustomers', JSON.stringify(updatedCustomers));
    
    alert('Customer updated successfully');
  };
  
  // Delete a customer
  const deleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      const updatedCustomers = customers.filter(c => c.id !== customerId);
      setCustomers(updatedCustomers);
      
      // Save to localStorage
      localStorage.setItem('platinumSignsCustomers', JSON.stringify(updatedCustomers));
      
      if (selectedCustomer && selectedCustomer.id === customerId) {
        setSelectedCustomer(null);
        setCustomerName('');
        setCustomerEmail('');
        setCustomerPhone('');
        setCustomerAddress('');
        setCustomerCity('');
        setCustomerPostal('');
      }
    }
  };
  
  // Calculate price for current item
  const calculateItemPrice = () => {
    if (!currentItem.signType || !currentItem.material || !currentItem.width || !currentItem.height) {
      return 0;
    }

    // Find the selected material and its price
    const materialsList = materialOptions[currentItem.signType];
    const selectedMaterial = materialsList.find(m => m.id === currentItem.material);
    
    if (!selectedMaterial) return 0;
    
    // Calculate square footage
    const squareFeet = (parseFloat(currentItem.width) * parseFloat(currentItem.height)) / 144;
    
    // Calculate base price
    let price = selectedMaterial.pricePerSqFt * squareFeet;
    
    // Apply double-sided modifier if applicable
    if (currentItem.doubleSided) {
      price *= modifiers.doubleSided;
    }
    
    // Apply lamination if applicable
    if (currentItem.lamination) {
      price *= modifiers.lamination;
    }
    
    // Add hardware cost
    const selectedHardware = hardwareOptions.find(h => h.id === currentItem.hardware);
    if (selectedHardware && selectedHardware.id !== 'None') {
      // For hardware like grommets, calculate based on perimeter
      if (selectedHardware.id === 'grommets') {
        const perimeter = 2 * (parseFloat(currentItem.width) + parseFloat(currentItem.height)) / 12; // in feet
        const grommetCount = Math.ceil(perimeter / 2); // One grommet every 2 feet
        price += grommetCount * selectedHardware.price;
      } else {
        price += selectedHardware.price;
      }
    }
    
    // Add finishing cost
    const selectedFinishing = finishingOptions.find(f => f.id === currentItem.finishingOption);
    if (selectedFinishing && selectedFinishing.id !== 'None') {
      if (['hems', 'trimming'].includes(selectedFinishing.id)) {
        const perimeter = 2 * (parseFloat(currentItem.width) + parseFloat(currentItem.height)) / 12; // in feet
        price += perimeter * selectedFinishing.price;
      } else {
        price += selectedFinishing.price * squareFeet;
      }
    }
    
    // Multiply by quantity
    price *= currentItem.quantity;
    
    // Apply installation if applicable
    if (currentItem.installation) {
      // Installation is based on the base price before quantity
      const installationCost = (selectedMaterial.pricePerSqFt * squareFeet) * (modifiers.installation - 1) * currentItem.quantity;
      price += installationCost;
    }
    
    // Apply rush if applicable
    if (currentItem.rush) {
      price *= modifiers.rush;
    }
    
    return price;
  };

  // Add current item to quote
  const addItemToQuote = () => {
    if (!currentItem.signType || !currentItem.material || !currentItem.width || !currentItem.height) {
      alert('Please complete all required fields');
      return;
    }
    
    const price = calculateItemPrice();
    
    // Find the sign type and material names for display
    const signTypeName = signTypes.find(t => t.id === currentItem.signType)?.name || '';
    const materialName = materialOptions[currentItem.signType]?.find(m => m.id === currentItem.material)?.name || '';
    
    // Create a new item with calculated price and display names
    const newItem = {
      ...currentItem,
      id: Date.now(),
      price: price,
      signTypeName: signTypeName,
      materialName: materialName,
      dimensions: `${currentItem.width}" × ${currentItem.height}"`
    };
    
    // Add to quote items
    setQuoteItems([...quoteItems, newItem]);
    
    // Reset current item (but keep the selected sign type and material for convenience)
    setCurrentItem({
      ...currentItem,
      id: Date.now() + 1,
      width: '',
      height: '',
      quantity: 1,
      doubleSided: false,
      installation: false,
      rush: false,
      lamination: false,
      hardware: 'None',
      finishingOption: 'None',
      notes: ''
    });
  };

  // Remove item from quote
  const removeItem = (id) => {
    setQuoteItems(quoteItems.filter(item => item.id !== id));
  };

  // Calculate quote total
  const calculateTotal = () => {
    let subtotal = quoteItems.reduce((sum, item) => sum + item.price, 0);
    let discount = subtotal * (discountPercent / 100);
    let afterDiscount = subtotal - discount;
    
    let gst = applyGST ? afterDiscount * (gstRate / 100) : 0;
    let pst = applyPST ? afterDiscount * (pstRate / 100) : 0;
    let taxTotal = gst + pst;
    
    return {
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      afterDiscount: afterDiscount.toFixed(2),
      gst: gst.toFixed(2),
      pst: pst.toFixed(2),
      taxTotal: taxTotal.toFixed(2),
      total: (afterDiscount + taxTotal).toFixed(2)
    };
  };

  // Handle form changes for current item
  const handleItemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentItem({
      ...currentItem,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Generate date for quote
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Reset the form
  const resetForm = () => {
    if (!window.confirm('Are you sure you want to start a new quote? All current information will be lost.')) {
      return;
    }
    
    setQuoteItems([]);
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setCustomerAddress('');
    setCustomerCity('');
    setCustomerPostal('');
    setQuoteNotes('');
    setDiscountPercent(0);
    setSelectedCustomer(null);
    setQuoteNumber(`PS-${new Date().getFullYear().toString().slice(2)}-${Math.floor(1000 + Math.random() * 9000)}`);
    setCurrentItem({
      id: Date.now(),
      signType: '',
      material: '',
      width: '',
      height: '',
      quantity: 1,
      doubleSided: false,
      installation: false,
      rush: false,
      lamination: false,
      hardware: 'None',
      finishingOption: 'None',
      notes: ''
    });
  };

  // Print quote
  const printQuote = () => {
    window.print();
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.phone.toLowerCase().includes(customerSearchTerm.toLowerCase())
  );

  // Total calculations
  const totals = calculateTotal();

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 rounded-lg shadow">
      {/* Header with company branding */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 rounded-t-lg shadow mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">PLATINUM SIGNS</h1>
            <p className="text-gray-300">Professional Signage Solutions</p>
          </div>
          <div className="text-right">
            <p className="text-sm">123 Sign Avenue, Suite 100</p>
            <p className="text-sm">Signtown, ST 12345</p>
            <p className="text-sm">(555) 123-4567</p>
            <p className="text-sm">sales@platinumsigns.com</p>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-6">Client Quote Builder</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Item Configuration */}
        <div className="md:col-span-2 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Add Sign Item</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Sign Type*</label>
              <select 
                className="w-full p-2 border rounded" 
                name="signType"
                value={currentItem.signType} 
                onChange={(e) => {
                  setCurrentItem({
                    ...currentItem,
                    signType: e.target.value,
                    material: ''
                  });
                }}
              >
                <option value="">Select Sign Type</option>
                {signTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            
            {currentItem.signType && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Material*</label>
                <select 
                  className="w-full p-2 border rounded" 
                  name="material"
                  value={currentItem.material} 
                  onChange={handleItemChange}
                >
                  <option value="">Select Material</option>
                  {materialOptions[currentItem.signType]?.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.name} (${material.pricePerSqFt}/sq.ft)
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Width (inches)*</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded" 
                name="width"
                value={currentItem.width} 
                onChange={handleItemChange}
                min="0.1"
                step="0.1"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Height (inches)*</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded" 
                name="height"
                value={currentItem.height} 
                onChange={handleItemChange}
                min="0.1"
                step="0.1"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded" 
                name="quantity"
                value={currentItem.quantity} 
                onChange={handleItemChange}
                min="1"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Hardware</label>
              <select 
                className="w-full p-2 border rounded" 
                name="hardware"
                value={currentItem.hardware} 
                onChange={handleItemChange}
              >
                {hardwareOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name} {option.price > 0 ? `(+$${option.price})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Finishing Options</label>
              <select 
                className="w-full p-2 border rounded" 
                name="finishingOption"
                value={currentItem.finishingOption} 
                onChange={handleItemChange}
              >
                {finishingOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name} {option.price > 0 ? `(+$${option.price})` : ''}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Notes for this item</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                name="notes"
                value={currentItem.notes} 
                onChange={handleItemChange}
                placeholder="Special instructions for this item"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  name="doubleSided"
                  checked={currentItem.doubleSided} 
                  onChange={handleItemChange}
                  className="rounded"
                />
                <span className="text-sm font-medium">Double Sided</span>
              </label>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  name="installation"
                  checked={currentItem.installation} 
                  onChange={handleItemChange}
                  className="rounded"
                />
                <span className="text-sm font-medium">Installation</span>
              </label>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  name="rush"
                  checked={currentItem.rush} 
                  onChange={handleItemChange}
                  className="rounded"
                />
                <span className="text-sm font-medium">Rush Order</span>
              </label>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  name="lamination"
                  checked={currentItem.lamination} 
                  onChange={handleItemChange}
                  className="rounded"
                />
                <span className="text-sm font-medium">Lamination</span>
              </label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <div>
              <span className="text-lg font-semibold">
                Item Price: ${calculateItemPrice().toFixed(2)}
              </span>
            </div>
            <button 
              onClick={addItemToQuote}
              className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-6 rounded font-medium"
            >
              Add to Quote
            </button>
          </div>
        </div>
        
        {/* Right Column - Customer Info & Tax Settings */}
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Customer Information</h2>
            <div>
              <button 
                onClick={() => setShowCustomerModal(true)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded text-sm"
              >
                Select Customer
              </button>
            </div>
          </div>
          
          {selectedCustomer && (
            <div className="mb-4 p-2 bg-gray-100 rounded flex justify-between items-center">
              <div>
                <p className="font-medium">{selectedCustomer.name}</p>
                <p className="text-sm text-gray-500">{selectedCustomer.email} | {selectedCustomer.phone}</p>
              </div>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-700 hover:text-gray-900 text-sm"
              >
                Change
              </button>
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Customer Name*</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded" 
              value={customerName} 
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                className="w-full p-2 border rounded" 
                value={customerEmail} 
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={customerPhone} 
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Address</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded" 
              value={customerAddress} 
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">City</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={customerCity} 
                onChange={(e) => setCustomerCity(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Postal Code</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={customerPostal} 
                onChange={(e) => setCustomerPostal(e.target.value)}
              />
            </div>
          </div>
          
          {!selectedCustomer && customerName && (
            <div className="mb-6">
              <button 
                onClick={saveCustomer}
                className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-sm"
              >
                Save as New Customer
              </button>
            </div>
          )}
          
          {selectedCustomer && (
            <div className="mb-6">
              <button 
                onClick={updateCustomer}
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
              >
                Update Customer Info
              </button>
            </div>
          )}
          
          <hr className="my-6" />
          
          <h2 className="text-xl font-semibold mb-4">Quote Settings</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Discount (%)</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded" 
              value={discountPercent} 
              onChange={(e) => setDiscountPercent(Math.max(0, Math.min(100, Number(e.target.value))))}
              min="0"
              max="100"
            />
          </div>
          
          <div className="border p-3 rounded bg-gray-50 mb-4">
            <h3 className="font-medium mb-2">Tax Settings</h3>
            
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={applyGST} 
                  onChange={() => setApplyGST(!applyGST)}
                  className="rounded"
                />
                <span className="text-sm">Apply GST</span>
              </label>
              
              <div className="w-20">
                <input 
                  type="number" 
                  className="w-full p-1 border rounded text-sm" 
                  value={gstRate} 
                  onChange={(e) => setGstRate(Math.max(0, Math.min(100, Number(e.target.value))))}
                  min="0"
                  max="100"
                  disabled={!applyGST}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={applyPST} 
                  onChange={() => setApplyPST(!applyPST)}
                  className="rounded"
                />
                <span className="text-sm">Apply PST</span>
              </label>
              
              <div className="w-20">
                <input 
                  type="number" 
                  className="w-full p-1 border rounded text-sm" 
                  value={pstRate} 
                  onChange={(e) => setPstRate(Math.max(0, Math.min(100, Number(e.target.value))))}
                  min="0"
                  max="100"
                  disabled={!applyPST}
                />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea 
              className="w-full p-2 border rounded" 
              value={quoteNotes} 
              onChange={(e) => setQuoteNotes(e.target.value)}
              rows="3"
              placeholder="Additional information or special instructions for the quote"
            ></textarea>
          </div>
          
          <div className="mt-6 flex flex-col space-y-1 bg-gray-50 p-3 rounded">
            <p><span className="font-medium">Subtotal:</span> ${totals.subtotal}</p>
            
            {Number(discountPercent) > 0 && (
              <p><span className="font-medium">Discount ({discountPercent}%):</span> -${totals.discount}</p>
            )}
            
            {(applyGST || applyPST) && (
              <>
                <p className="text-sm text-gray-500 border-t pt-1 mt-1">Taxes:</p>
                {applyGST && (
                  <p className="text-sm"><span>GST ({gstRate}%):</span> ${totals.gst}</p>
                )}
                {applyPST && (
                  <p className="text-sm"><span>PST ({pstRate}%):</span> ${totals.pst}</p>
                )}
                <p className="text-sm"><span>Tax Total:</span> ${totals.taxTotal}</p>
              </>
            )}
            
            <p className="text-xl font-bold border-t pt-2 mt-1">Total: ${totals.total}</p>
          </div>
          
          <div className="mt-4 flex justify-center space-x-4">
            <button 
              onClick={resetForm}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
            >
              New Quote
            </button>
            <button 
              onClick={printQuote}
              className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded"
              disabled={quoteItems.length === 0}
            >
              Print Quote
            </button>
          </div>
        </div>
      </div>
      
      {/* Quote Items List */}
      <div className="mt-8 bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Quote Items</h2>
          <div>
            <span className="font-medium mr-2">Quote #{quoteNumber}</span>
            <span className="text-gray-500">{formatDate()}</span>
          </div>
        </div>
        
        {quoteItems.length === 0 ? (
          <p className="text-center py-6 text-gray-500">No items added to quote yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 border text-left">Item</th>
                  <th className="p-2 border text-left">Material</th>
                  <th className="p-2 border text-center">Dimensions</th>
                  <th className="p-2 border text-center">Qty</th>
                  <th className="p-2 border text-center">Options</th>
                  <th className="p-2 border text-right">Price</th>
                  <th className="p-2 border text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {quoteItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2 border">{item.signTypeName}</td>
                    <td className="p-2 border">{item.materialName}</td>
                    <td className="p-2 border text-center">{item.dimensions}</td>
                    <td className="p-2 border text-center">{item.quantity}</td>
                    <td className="p-2 border text-center">
                      {[
                        item.doubleSided ? 'Double Sided' : '',
                        item.installation ? 'Installation' : '',
                        item.rush ? 'Rush Order' : '',
                        item.lamination ? 'Lamination' : '',
                        item.hardware !== 'None' ? hardwareOptions.find(h => h.id === item.hardware)?.name : '',
                        item.finishingOption !== 'None' ? finishingOptions.find(f => f.id === item.finishingOption)?.name : ''
                      ].filter(Boolean).join(', ')}
                    </td>
                    <td className="p-2 border text-right">${item.price.toFixed(2)}</td>
                    <td className="p-2 border text-center">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 font-medium">
                <tr>
                  <td colSpan="5" className="p-2 border text-right">Subtotal:</td>
                  <td className="p-2 border text-right">${totals.subtotal}</td>
                  <td></td>
                </tr>
                {Number(discountPercent) > 0 && (
                  <tr>
                    <td colSpan="5" className="p-2 border text-right">Discount ({discountPercent}%):</td>
                    <td className="p-2 border text-right">-${totals.discount}</td>
                    <td></td>
                  </tr>
                )}
                {applyGST && (
                  <tr>
                    <td colSpan="5" className="p-2 border text-right">GST ({gstRate}%):</td>
                    <td className="p-2 border text-right">${totals.gst}</td>
                    <td></td>
                  </tr>
                )}
                {applyPST && (
                  <tr>
                    <td colSpan="5" className="p-2 border text-right">PST ({pstRate}%):</td>
                    <td className="p-2 border text-right">${totals.pst}</td>
                    <td></td>
                  </tr>
                )}
                <tr>
                  <td colSpan="5" className="p-2 border text-right font-bold">Total:</td>
                  <td className="p-2 border text-right font-bold">${totals.total}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        
        <div className="mt-6 text-xs text-gray-500">
          <p className="mb-2">Platinum Signs Terms and Conditions:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>This quote is valid for 30 days from the date issued</li>
            <li>50% deposit required to begin production</li>
            <li>Final payment due upon completion before delivery/installation</li>
            <li>Design fees may apply for custom artwork or revisions</li>
            <li>Standard production time is 5-7 business days after approval</li>
            <li>Rush orders (48hr) incur a 30% surcharge</li>
            <li>Prices are subject to change based on final design specifications</li>
            <li>Platinum Signs is not responsible for permits or zoning compliance</li>
            <li>All applicable taxes are charged as per provincial/federal regulations</li>
          </ul>
        </div>
        
        {/* Footer */}
        <div className="mt-8 pt-4 border-t text-center text-gray-500 text-sm">
          <p>Thank you for choosing Platinum Signs for your signage needs!</p>
          <p>For questions about this quote, please contact us at (555) 123-4567 or sales@platinumsigns.com</p>
          <p>© 2025 Platinum Signs. All rights reserved.</p>
        </div>
      </div>
      
      {/* Customer Selection Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select Customer</h2>
              <button 
                onClick={() => setShowCustomerModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4 flex justify-between items-center">
              <input
                type="text"
                placeholder="Search customers..."
                className="p-2 border rounded w-full mr-2"
                value={customerSearchTerm}
                onChange={(e) => setCustomerSearchTerm(e.target.value)}
              />
              
              <button
                onClick={() => setShowAddCustomerForm(!showAddCustomerForm)}
                className="bg-gray-700 hover:bg-gray-800 text-white py-1 px-3 rounded whitespace-nowrap"
              >
                {showAddCustomerForm ? 'Cancel' : 'Add New'}
              </button>
            </div>
            
            {showAddCustomerForm ? (
              <div className="bg-gray-50 p-4 rounded mb-4">
                <h3 className="font-medium mb-3">Add New Customer</h3>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Name*</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-2 border rounded"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded"
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Postal Code</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded"
                      value={customerPostal}
                      onChange={(e) => setCustomerPostal(e.target.value)}
                    />
                  </div>
                </div>
                
                <button
                  onClick={saveCustomer}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                >
                  Save Customer
                </button>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {filteredCustomers.length === 0 ? (
                  <p className="text-center py-6 text-gray-500">No customers found</p>
                ) : (
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border text-left">Name</th>
                        <th className="p-2 border text-left">Contact</th>
                        <th className="p-2 border text-left">Location</th>
                        <th className="p-2 border text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((customer) => (
                        <tr key={customer.id} className="border-b hover:bg-gray-50">
                          <td className="p-2 border font-medium">{customer.name}</td>
                          <td className="p-2 border">
                            <div>{customer.email}</div>
                            <div className="text-sm text-gray-500">{customer.phone}</div>
                          </td>
                          <td className="p-2 border">
                            <div>{customer.city}</div>
                            <div className="text-sm text-gray-500">{customer.postal}</div>
                          </td>
                          <td className="p-2 border text-center">
                            <button
                              onClick={() => selectCustomer(customer)}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded text-sm mr-1"
                            >
                              Select
                            </button>
                            <button
                              onClick={() => deleteCustomer(customer.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
            
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowCustomerModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatinumSignsQuoteBuilder;

// Render the component
root.render(<PlatinumSignsQuoteBuilder />);
