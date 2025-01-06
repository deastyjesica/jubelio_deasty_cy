describe('Jubelio Test', function() {

  beforeEach(() => {
    cy.visit('https://v2.jubelio.com/');
    cy.viewport(1280, 800); 
    cy.get('#textfield-email').type('deastyjesica@gmail.com');
    cy.get('#textfield-password').type('Deasty10!');
    cy.get('.MuiButton-root').click();
  });

  it('1. Login', function() {
    cy.contains('Selamat Datang di Trial Jubelio').should('be.visible');
    cy.wait(2000); 
    cy.screenshot('login', { capture: 'viewport' });
  });

  it('2. Create Penjualan', function(){
    cy.get(':nth-child(4) > .false > .mr-2').click(); //click penjualan
    cy.get('[href="/sales/transactions"] > :nth-child(1) > .d-flex > .flex-grow-1 > .font-weight-bold').click(); //click transaksi penjualan
    cy.get('[style="position: absolute; right: 35px; top: 60px; z-index: 99999; width: 400px; background: rgb(255, 255, 255); height: calc(100% - 130px);"] > .MuiButton-root').click(); //click >
    cy.get('.MuiButton-root > .d-flex').should('be.visible').click(); //click tambah baru
    cy.get('.css-53jtis > .MuiAutocomplete-root > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').should('be.visible').click(); //pilih pelanggan
    cy.get('#mui-23-option-6').click();
    cy.get('.css-s3zakr > .MuiAutocomplete-root > .MuiFormControl-root > .MuiOutlinedInput-root').click(); //pilih lokasi
    cy.get('#mui-30-option-0').click(); 
    cy.get('.css-1o9xw9j > .MuiButton-root').click(); //click tambah baru
    //cy.get('[data-index="0"] > [style="height: 74px;"] > .css-1rjpksd').click(); //click produk1
    cy.get('[data-index="1"] > [style="height: 74px;"] > .css-1rjpksd').scrollIntoView().should('be.visible').click();
    cy.get('.d-flex > div > .MuiButton-root').click(); //click simpan
    cy.wait(2000); 
    cy.screenshot('create_order', { capture: 'viewport' });

  })

  it('3. Search Pesanan', function(){
    //search pesanan by nama
    cy.get(':nth-child(4) > .false > .mr-2').click(); //click penjualan
    cy.get('[href="/sales/transactions"] > :nth-child(1) > .d-flex > .flex-grow-1 > .font-weight-bold').click(); //click transaksi penjualan
    cy.get('[data-testid="ChevronRightIcon"]').click(); //perbesar
    cy.get('.MuiTabs-flexContainer > :nth-child(1)').click(); //click semua pesanan
    cy.get('#mui-9').type('BLIBLI'); //ketik pesanan blibli
    cy.get('.css-rfnosa > .MuiButton-root').click(); //click terapkan
    cy.contains('BLIBLI').should('be.visible');
    cy.wait(2000); 
    cy.screenshot('search_by_name', { capture: 'viewport' });

    //search pesanan by sku/produk
    cy.get('.mt-3 > .MuiFormControl-root > .MuiFormGroup-root > :nth-child(2) > .MuiRadio-root > .PrivateSwitchBase-input').click(); //click sku/produk
    cy.get('#mui-9').clear().type('0003') //ketik no sku
    cy.contains('SO-000000002').should('be.visible');

    //search pesanan by toko
    cy.get('.mt-3 > .MuiFormControl-root > .MuiFormGroup-root > :nth-child(1) > .MuiRadio-root > .PrivateSwitchBase-input').click(); //click pesanan
    cy.get('#mui-9').clear();
    cy.get(':nth-child(9) > .select-filter').click(); //click pilih toko
    cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').click(); //pilih toko default
    cy.get('.css-rfnosa > .MuiButton-root').click(); //click terapkan
    cy.get('#table-container-grid').should('be.visible');
    cy.wait(2000); 
    cy.get('#table-container-grid').scrollIntoView(); 
    cy.screenshot('search_by_toko', { capture: 'viewport' }); 
  })
});