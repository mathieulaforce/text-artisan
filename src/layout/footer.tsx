import { ParentComponent } from 'solid-js';

const Footer: ParentComponent = () => {
  return (
    <footer class="footer footer-center p-4 bg-base-200 text-base-content">
      <aside>
        <p>
          code and documentation at{' '}
          <a class="link link-hove" href="https://github.com/mathieulaforce/text-artisan" target="blank">
            https://github.com/mathieulaforce/text-artisan
          </a>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
