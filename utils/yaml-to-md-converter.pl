#!/usr/bin/env perl

use strict;
use warnings;
use File::Basename;
use File::Path qw(make_path);
use YAML::XS qw(LoadFile);
use Encode qw(decode encode);
use utf8;

# Check if two command line arguments are provided
if (@ARGV != 2) {
    die "Usage: $0 <yaml_directory> <md_directory>\n";
}

my ($yaml_dir, $md_dir) = @ARGV;

# Check if yaml_dir exists
if (!-d $yaml_dir) {
    die "Error: YAML directory '$yaml_dir' does not exist.\n";
}

# Create md_dir if it doesn't exist
if (!-d $md_dir) {
    make_path($md_dir) or die "Error: Cannot create directory '$md_dir': $!\n";
}

# Process all YAML files in the directory
opendir(my $dh, $yaml_dir) or die "Cannot open directory '$yaml_dir': $!\n";
while (my $file = readdir($dh)) {
    next unless $file =~ /\.ya?ml$/i;  # Process only .yml or .yaml files
    
    my $yaml_file = "$yaml_dir/$file";
    my $base_name = basename($file, '.yml', '.yaml');
    my $md_file = "$md_dir/$base_name.md";
    
    print "Converting $yaml_file to $md_file...\n";
    convert_yaml_to_md($yaml_file, $md_file, $base_name);
}
closedir($dh);

print "Conversion completed successfully.\n";

sub convert_yaml_to_md {
    my ($yaml_file, $md_file, $id) = @_;
    
    # Load YAML file
    my $data;
    eval {
        $data = LoadFile($yaml_file);
    };
    if ($@) {
        warn "Error parsing YAML file '$yaml_file': $@\n";
        return;
    }
    
    # Open markdown file for writing
    open(my $md_fh, '>:encoding(UTF-8)', $md_file) or die "Cannot open file '$md_file' for writing: $!\n";
    
    # Write frontmatter
    print $md_fh "---\n";
    print $md_fh "id: \"$id\"\n";
    print $md_fh "name: \"$data->{name}\"\n" if exists $data->{name};
    print $md_fh "description: \"$data->{description}\"\n" if exists $data->{description};
    
    # Convert tags from original yaml
    if (exists $data->{licenses} || exists $data->{platforms}) {
        print $md_fh "tags:\n";
        
        # Add licenses to tags
        if (exists $data->{licenses} && ref $data->{licenses} eq 'ARRAY') {
            foreach my $license (@{$data->{licenses}}) {
                print $md_fh "  - \"$license\"\n";
            }
        }
        
        # Add platforms to tags
        if (exists $data->{platforms} && ref $data->{platforms} eq 'ARRAY') {
            foreach my $platform (@{$data->{platforms}}) {
                print $md_fh "  - \"$platform\"\n";
            }
        }
    }
    
    # Use original tags as category
    if (exists $data->{tags} && ref $data->{tags} eq 'ARRAY' && @{$data->{tags}} > 0) {
        my $category = $data->{tags}->[0]; # Use the first tag as category
        $category =~ s/ - .*$//;  # Remove anything after " - " if it exists
        print $md_fh "category: \"$category\"\n";
    }
    
    # Add website and GitHub links
    print $md_fh "website: \"$data->{website_url}\"\n" if exists $data->{website_url};
    print $md_fh "github: \"$data->{source_code_url}\"\n" if exists $data->{source_code_url};
    
    # Add placeholder for image (commented out)
    print $md_fh "#image: \"/placeholder.svg?height=300&width=400\"\n";
    
    # End frontmatter
    print $md_fh "---\n\n";
    
    # Add main content - just the name as a header
    print $md_fh "# $data->{name}\n" if exists $data->{name};
    
    close($md_fh);
}